require 'net/http'
require 'open-uri'

class Film < ApplicationRecord
  validates :tmdb_id, :title, presence: true
  validates :tmdb_id, uniqueness: true

  has_many :contributions, dependent: :destroy,
    foreign_key: :film_id,
    class_name: :FilmCrew

  has_many :crewmembers, -> { distinct },
    through: :contributions,
    source: :person

  has_many :actors, -> { merge(FilmCrew.actor) },
    through: :contributions,
    source: :person
  
  has_one :user, -> { none }

  has_one :film, -> { none }

  has_many :reviews, dependent: :destroy

  has_many :watchers, -> { watched }, class_name: :Review

  has_many :likes, as: :likeable

  has_many :list_appearances,
    class_name: :ListElement

  has_many :lists,
    through: :list_appearances,
    source: :list
  
  has_one_attached :poster

  has_one_attached :backdrop

  def update_watch_count
    self.update(watch_count: self.watchers.length)
    self.save
  end

  def self.reduce_constraints(*constraints)
    return constraints.inject(Film){|relation,constraint| apply_constraint(relation,constraint)}.where(nil)
  end

  def self.apply_constraint(relation,constraint)
    case constraint[0]
    when "year"
      relation.where(release_year: Integer(constraint[1]))
    when "decade"
      relation.where('(release_year/10)*10 = ?',constraint[1])
    when "actor" || "director" || "writer" || "producer" || "composer"
      relation.joins(:contributions).where('position = ? AND person_id = ?',constraint[0],constraint[1])
    when "language"
      relation.where("? = ANY (languages)",constraint[1].capitalize)
    when "genre"
      relation.where("? = ANY (genres)", constraint[1].capitalize)
    end
  end

  def self.populate_films!(*ids)
    film_list = []
    ids.each do |id|
      film_list << Film.populate_film!(id)
    end
    film_list
  end

  def self.populate_film!(id)
    response = Film.request_film(id)
    film = Film.new(Film.extract_film_data(response))
    film.save!
    backdrop = film.backdrop.attach(io: Film.request_image(response["backdrop_path"][1..],"w1280"), filename: "#{film[:id]}-backdrop.jpg")
    poster = film.poster.attach(io: Film.request_image(response["poster_path"][1..],"w780"), filename: "#{film[:id]}-poster.jpg")
    Film.populate_people(response)
    film
  end

  def self.request_film(tmdb_id)
    uri = URI.parse("https://api.themoviedb.org/3/movie/#{tmdb_id}?api_key=#{Rails.application.credentials.dig(:tmdb_api_key)}&language=en-US&append_to_response=credits")
    JSON.parse(Net::HTTP.get_response(uri).body)
  end

  def self.request_image(filename, size)
    URI.open("http://image.tmdb.org/t/p/#{size}/#{filename}")
  end

  def self.extract_film_data(film)
    {
      tmdb_id: film["id"],
      title: film["title"],
      release_year: film["release_date"][0...4],
      blurb: film["overview"],
      tagline: film["tagline"],
      runtime: film["runtime"],
      genres: film["genres"].map{|genre| genre["name"]},
      studio: film["production_companies"][0] ? film["production_companies"][0]["name"] : nil,
      languages: film["spoken_languages"].map{|lang| lang["english_name"]},
      country: film["production_countries"][0]["name"]
    }
  end

  def self.extract_person_data(credit)
    {
      tmdb_id: credit["id"],
      name: credit["name"]
    }
  end

  def self.extract_credit_data(field,credit,person_id,film_id)
    credit["job"] = "composer" if credit["job"] === "Original Music Composer"
    credit["job"] = "writer" if credit["job"] === "Screenplay"
    case field
    when "cast"
      {
        person_id: person_id,
        film_id: film_id,
        position: "actor",
        ord: credit["order"],
        role: credit["character"]
      }
    when "crew"
      {
        person_id: person_id,
        film_id: film_id,
        position: credit["job"].is_a?(String) ? credit["job"].downcase : credit["job"]
      }
    end
  end

  def self.populate_people(response)
    film = Film.find_by(tmdb_id: response["id"])
    credits = response["credits"]
    ["cast","crew"].each do |field|
      credits[field].each do |data|
        person = Person.find_by(tmdb_id: data["id"])
        person = Person.new(extract_person_data(data)) if !person
        person.save!
        fc_data = extract_credit_data(field,data,person.id,film.id)
        fc = FilmCrew.find_by(person_id: person.id, film_id: film.id, position: fc_data[:position], role: fc_data[:role])
        fc ? fc.update(fc_data) : fc = FilmCrew.new(fc_data)
        fc.save!
      end
    end
  end
end
