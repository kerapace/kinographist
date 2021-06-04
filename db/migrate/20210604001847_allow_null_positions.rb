class AllowNullPositions < ActiveRecord::Migration[5.2]
  def change
    change_column_null :film_crews, :position, :true
  end
end
