# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_05_01_221042) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "film_crews", force: :cascade do |t|
    t.integer "person_id", null: false
    t.integer "film_id", null: false
    t.string "position"
    t.string "ord"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["person_id", "film_id"], name: "index_film_crews_on_person_id_and_film_id"
  end

  create_table "films", force: :cascade do |t|
    t.integer "tmdb_id", null: false
    t.string "title", null: false
    t.text "blurb"
    t.string "studio"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tagline"
    t.integer "runtime"
    t.integer "release_year"
    t.string "languages", array: true
    t.string "genres", array: true
    t.integer "likes_count"
    t.integer "watch_count"
    t.index ["title"], name: "index_films_on_title"
    t.index ["tmdb_id"], name: "index_films_on_tmdb_id", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "likeable_type"
    t.bigint "likeable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
  end

  create_table "list_elements", force: :cascade do |t|
    t.integer "film_id", null: false
    t.integer "list_id", null: false
    t.integer "ord", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lists", force: :cascade do |t|
    t.integer "user_id", null: false
    t.boolean "is_watch_list", default: false, null: false
    t.string "title"
    t.text "blurb"
    t.boolean "ordered", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "num_elements"
    t.integer "max_ord", default: 0
    t.integer "likes_count"
  end

  create_table "people", force: :cascade do |t|
    t.integer "tmdb_id", null: false
    t.string "name", null: false
    t.text "blurb"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_people_on_name"
    t.index ["tmdb_id"], name: "index_people_on_tmdb_id", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "film_id", null: false
    t.integer "user_id", null: false
    t.float "rating"
    t.boolean "watched"
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "likes_count"
    t.index ["user_id", "film_id"], name: "index_reviews_on_user_id_and_film_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "bio"
    t.integer "watch_count"
    t.integer "likes_count", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
