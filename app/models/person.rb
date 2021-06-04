class Person < ApplicationRecord
  has_many :contributions,
    class_name: :FilmCrew

  has_many :films, -> { distinct },
    through: :contributions,
    source: :film
end
