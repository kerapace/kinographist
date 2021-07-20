class RemoveTitleConstraint < ActiveRecord::Migration[5.2]
  def change
    change_column :lists, :title, :string, null: true
  end
end
