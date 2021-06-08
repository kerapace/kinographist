class ChangeLanguagesAndGenres < ActiveRecord::Migration[5.2]
  def change
    remove_column :films, :languages
    remove_column :films, :genres
    add_column :films, :languages, :string, array: true
    add_column :films, :genres, :string, array: true
  end
end
