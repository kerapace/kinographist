class Film < ApplicationRecord
  validates :tmdb_id, :title, presence: true
  validates :tmdb_id, uniqueness: true

  has_many :contributions,
    foreign_key: :film_id,
    class_name: :FilmCrew

  has_many :crewmembers, -> { distinct },
    through: :contributions,
    source: :person

  # has_many :actors,
  #   source: :contributions,
  #   through: :actor

  # has_many :crewmembers,
  #   source: :contributions,
  #   through: :crewmember
end
