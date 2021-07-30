class Like < ApplicationRecord
  validates :user_id, uniqueness: {scope: [:likeable_type, :likeable_id]}
  belongs_to :user, counter_cache: true
  belongs_to :likeable, polymorphic: true, counter_cache: true
end