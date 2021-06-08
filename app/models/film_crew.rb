class FilmCrew < ApplicationRecord
  validates :film_id, :person_id, presence: true
  # validates :ord, :role #, presence: true, if: :is_actor?
  belongs_to :film

  belongs_to :person
  # belongs_to :actor, -> {:actor}

  def is_actor?
    position == "actor"
  end
end
