class SetDefaultBooleansToFalse < ActiveRecord::Migration[5.2]
  def change
    change_column :lists, :is_watch_list, :boolean, default: false
    change_column :lists, :ordered, :boolean, default: true
  end
end
