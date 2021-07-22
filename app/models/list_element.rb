class ListElement < ApplicationRecord
  belongs_to :list, counter_cache: :num_elements
  belongs_to :film
  validates :ord, :film_id, :list_id, presence: true
  validates :ord, :film_id, uniqueness: {scope: :list_id}
  before_save :increment_max_ord

  def increment_max_ord
    self.list.max_ord = self.list.max_ord + 1
    self.list.save
  end
end