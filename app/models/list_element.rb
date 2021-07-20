class ListElement < ApplicationRecord
  belongs_to :list, counter_cache: :num_elements, dependent: :destroy
  belongs_to :film
  validates :ord, :film_id, :list_id, presence: true
  validates :ord, :film_id, uniqueness: {scope: :list_id}
end
