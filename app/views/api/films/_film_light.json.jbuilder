json.key_format! camelize: :lower

json.extract! film, :id, :title, :tmdb_id
json.poster url_for(film.poster) if film.poster.attached?
json.backdrop url_for(film.backdrop) if film.backdrop.attached?