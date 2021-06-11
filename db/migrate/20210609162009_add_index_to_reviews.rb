class AddIndexToReviews < ActiveRecord::Migration[5.2]
  def change
    add_index :reviews, [:user_id,:film_id], unique: true
  end
end
