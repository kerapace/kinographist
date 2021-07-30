json.key_format! camelize: :lower

json.films do
  json.set! @film.id do
    json.extract! @film, :id, :tmdb_id, :title, :tagline, :release_year, :blurb, :studio, :languages, :country, :genres, :likes_count
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
        json.partial! 'api/reviews/review', review: review
    end
  end
end
json.reviews({}) if @film.reviews.empty?

json.users do
  if @user
    json.set! @user.id do
      json.extract! @user, :id, :username
    end
  end
  @film.reviews.each do |review|
    user = review.user
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end

json.users({}) if @film.reviews.empty?

json.likes({})
json.likes do
  @review_film_likes.each do |like|
    if like
      json.set! like.id do
        json.extract! like, :id, :user_id, :likeable_id, :likeable_type
      end
    end
  end
  if @user
    @user.likes.each do |like|
      json.set! like.id do
        json.extract! like, :id, :user_id, :likeable_id, :likeable_type
      end
    end
  end
  # if @user
  #   user_like = Like.find_by(
  #     user_id: @user.id,
  #     likeable_type: "Film",
  #     likeable_id: @film.id
  #   )
  #   if user_like
  #     json.set! user_like.id do
  #       json.extract! user_like, :id, :user_id, :likeable_id, :likeable_type
  #     end
  #   end
  # end
end

@film.lists.each do |list|
  json.partial! 'api/lists/preview', list: list
end

json.list_elements({})
json.list_elements do
  @film.list_appearances.each do |el|
    json.set! el.id do
      json.extract! el, :id, :list_id, :film_id, :ord
    end
  end
end

json.lists({})
if @user
  json.lists do
    @user.lists.each do |list|
      json.set! list.id do
        json.extract! list, :id, :user_id, :is_watch_list, :title, :blurb, :ordered, :num_elements
      end
    end
  end
end

@film.lists.each do |list|
  json.partial! '/api/lists/preview', list: list
end



