class Review < ApplicationRecord
  belongs_to :user
  belongs_to :film
  has_many :likes, as: :likeable
  has_one :user_like, ->{where(likeable_id: :film_id)}, through: :user, source: :likes

  # validates :title, presence: true, if: :reviewed
  validates :watched, inclusion: {in: [true]}, if: :reviewed
  validates :user_id, uniqueness: {scope: :film_id}

  after_save :update_watch_count
  after_destroy :update_watch_count

  def update_watch_count
    self.film.update_watch_count
    self.user.update_watch_count
  end

  def reviewed
    body != nil
  end

  scope :reviewed, ->{ where.not(body: nil) }

  scope :watched, ->{ where(watched: true) }
end
