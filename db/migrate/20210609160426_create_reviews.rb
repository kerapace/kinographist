class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :film_id, null: false
      t.integer :user_id, null: false
      t.float :rating
      t.boolean :watched
      t.string :title
      t.text :body
      t.timestamps
    end
  end
end
