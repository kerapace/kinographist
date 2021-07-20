class SetMaxOrdDefaultToZero < ActiveRecord::Migration[5.2]
  def change
    change_column :lists, :max_ord, :integer, default: 0
  end
end
