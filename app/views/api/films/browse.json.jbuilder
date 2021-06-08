json.key_format! camelize: :lower

json.films do
  @films.each do |film|
    json.set! film.id do
      json.extract! film, :id, :title
      json.poster url_for(film.poster) if film.poster.attached?
    end
  end
end