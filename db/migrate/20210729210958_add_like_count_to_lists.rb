class AddLikeCountToLists < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :like_count, :integer
  end
end
