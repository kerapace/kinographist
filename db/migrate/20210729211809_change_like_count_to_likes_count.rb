class ChangeLikeCountToLikesCount < ActiveRecord::Migration[5.2]
  def change
    rename_column :lists, :like_count, :likes_count
  end
end
