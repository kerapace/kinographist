class AddNumElements < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :num_elements, :integer
  end
end
