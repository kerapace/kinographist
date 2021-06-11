class Review < ApplicationRecord

  belongs_to :user
  belongs_to :film

  # validates :title, presence: true, if: :reviewed
  validates :watched, inclusion: {in: [true]}, if: :reviewed
  validates :user_id, uniqueness: {scope: :film_id}

  def reviewed
    body != nil
  end

  scope :reviewed, ->{ where.not(body: nil) }
end
