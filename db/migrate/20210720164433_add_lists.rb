class AddLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.integer :user_id, null: false
      t.boolean :is_watch_list, null: false
      t.string :title, null: false
      t.text :blurb
      t.boolean :ordered
    end

    create_table :list_elements do |t|
      t.integer :film_id, null: false
      t.integer :list_id, null: false
      t.integer :ord, null: false
    end

    add_column :users, :watch_list, :integer
  end
end
