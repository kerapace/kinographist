class ChangeReleaseDateToYear < ActiveRecord::Migration[5.2]
  def change
    remove_column :films, :release_date
    add_column :films, :release_year, :integer
  end
end