class AddMaxOrdToList < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :max_ord, :integer
  end
end
