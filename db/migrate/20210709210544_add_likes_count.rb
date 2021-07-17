class AddLikesCount < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :likes_count, :integer
    add_column :films, :likes_count, :integer
  end
end
