require 'uri'
require 'net/http'

class Api::FilmsController < ApplicationController
  def create
    response = request_film(params[:tmdbId])
    film_data = extract_film_data(response)
    @film = Film.new(film_data)
    if @film.save
      populate_people(response)
      render :show
    else
      render json: @film.errors.full_messages, status: 422
    end
  end

  def update
    @film = Film.find_by(id: params[:id])
    response = request_film(@film.tmdb_id)
    film_data = extract_film_data(response)
    if @film.update(film_data)
      render :show
    else
      render json: @film.errors.full_messages, status: 422
    end
  end

  def show
    @film = Film.includes(:contributions,:crewmembers).find_by(id: params[:id])
  end

  private
  def request_film(tmdb_id)
    uri = URI.parse("https://api.themoviedb.org/3/movie/#{tmdb_id}?api_key=#{Rails.application.credentials.dig(:tmdb_api_key)}&language=en-US&append_to_response=credits")
    response = JSON.parse(Net::HTTP.get_response(uri).body)
  end

  def extract_film_data(film)
    {
      tmdb_id: film["id"],
      title: film["title"],
      release_date: film["release_date"],
      blurb: film["overview"],
      studio: film["production_companies"][0] ? film["production_companies"][0]["name"] : nil,
      languages: film["spoken_languages"].map{|lang| lang["english_name"]}.join(", "),
      country: film["production_countries"][0]["name"]
    }
  end

  def extract_person_data(credit)
    {
      tmdb_id: credit["id"],
      name: credit["name"]
    }
  end

  def extract_credit_data(field,credit,person_id,film_id)
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

  def populate_people(response)
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