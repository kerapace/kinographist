class Review < ApplicationRecord
  belongs_to :user
  belongs_to :film
  has_many :likes, as: :likeable
  has_one :user_like, ->(review) {where(likeable_type: "Film", likeable_id: review.film_id)}, through: :user, source: :likes
  # has_one :user_like, foreign_key: [:user_id, :likeable_id, :likeable_type], primary_key: [:user_id, :film_id, "Film"], class_name: :Like
  # validates :title, presence: true, if: :reviewed
  validates :watched, inclusion: {in: [true]}, if: :reviewed
  validates :user_id, uniqueness: {scope: :film_id}

  after_save :update_watch_count
  after_destroy :update_watch_count
  scope :joined_user_like, ->{joins("INNER JOIN users ON reviews.user_id = users.id INNER JOIN likes AS film_likes ON users.id = film_likes.user_id").where("film_likes.likeable_type = 'Film' AND film_likes.likeable_id = reviews.film_id")}
  
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