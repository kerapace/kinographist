json.extract! film, :id, :tmdb_id, :title, :tagline, :release_year, :blurb, :studio, :languages, :country, :genres, :likes_count
json.poster url_for(film.poster) if film.poster.attached?
json.backdrop url_for(film.backdrop) if film.backdrop.attached?