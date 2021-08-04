json.films do
  json.set! @film.id do
    json.partial! 'api/films/film_light', film: @film
  end
end