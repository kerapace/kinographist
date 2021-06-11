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

json.reviews do
  @film.reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :user_id, :film_id, :rating, :watched, :title, :body
        json.created Time.at(review.created_at).strftime("%B %e, %Y at %I:%M")
        json.updated Time.at(review.updated_at).strftime("%B %e, %Y at %I:%M")
    end
  end
end
json.reviews({}) if @film.reviews.empty?

json.users do
  @film.reviews.each do |review|
    user = review.user
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end

json.users({}) if @film.reviews.empty?