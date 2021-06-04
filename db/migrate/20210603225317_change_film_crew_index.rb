class ChangeFilmCrewIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :film_crews, [:person_id,:film_id]
    add_index :film_crews, [:person_id,:film_id]
  end
end
