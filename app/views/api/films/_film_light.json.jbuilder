json.extract! film, :id, :title
json.poster url_for(film.poster) if film.poster.attached?