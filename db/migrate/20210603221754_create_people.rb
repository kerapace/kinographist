class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.integer :tmdb_id, null: false
      t.string :name, null: false
      t.text :blurb
      t.timestamps
    end

    add_index :people, :tmdb_id, unique: true
    add_index :people, :name
  end
end
