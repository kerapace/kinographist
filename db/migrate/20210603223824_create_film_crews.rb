class CreateFilmCrews < ActiveRecord::Migration[5.2]
  def change
    create_table :film_crews do |t|
      t.integer :person_id, null: false
      t.integer :film_id, null: false
      t.string :position, null: false
      t.string :ord, null: false
      t.string :role
      t.timestamps
    end
    add_index :film_crews, [:person_id, :film_id], unique: true
  end
end
