json.key_format! camelize: :lower

json.films do
  json.set! @film.id do
    json.extract! @film, :id, :title, :tagline, :release_year, :blurb, :studio, :languages, :country, :genres
    json.poster @poster
    json.backdrop @backdrop
  end
end

json.people do
  @film.crewmembers.each do |person|
    json.set! person.id do
      json.extract! person, :id, :name
    end
  end
end

json.film_crew do
  @film.contributions.each do |credit|
    json.set! credit.id do
      json.extract! credit, :id, :film_id, :person_id, :position, :ord, :role
    end
  end
end