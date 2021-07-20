class DeleteWatchList < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :watch_list
  end
end
