class Person < ApplicationRecord
  has_many :contributions,
    class_name: :FilmCrew

  has_many :films, -> { distinct },
    through: :contributions,
    source: :film

  # has_many :long_film_acting_credits, -> {joins(:contributions).merge(FilmCrew.in_long_film)},
  #   through: :contributions,
  #   source: :film
end
