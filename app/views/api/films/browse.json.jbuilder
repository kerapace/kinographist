json.key_format! camelize: :lower

json.films do
  @films.each do |film|
    json.set! film.id do
      json.partial! '/api/films/film_verbose', film: film
    end
  end
end