class AddWatchCounters < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :watch_count, :integer
    add_column :films, :watch_count, :integer
  end
end