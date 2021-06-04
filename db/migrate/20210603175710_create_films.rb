class CreateFilms < ActiveRecord::Migration[5.2]
  def change
    create_table :films do |t|
      t.integer :tmdb_id, null: false
      t.string :title, null: false
      t.date :release_date
      t.text :blurb
      t.string :studio
      t.string :languages
      t.string :country
      t.timestamps
    end
    add_index :films, :tmdb_id, unique: true
    add_index :films, :title
  end
end
