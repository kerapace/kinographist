class AddTaglineAndRuntimeToFilms < ActiveRecord::Migration[5.2]
  def change
    add_column :films, :tagline, :string
    add_column :films, :runtime, :integer
    add_column :films, :genres, :string
  end
end
