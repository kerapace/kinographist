json.key_format! camelize: :lower

like_obj = @user.likes.group_by(&:likeable_type)
["Review","Film","List"].each{|key| like_obj[key] ||= []}

json.reviews({})

json.reviews do
  like_obj["Review"].each do |like|
    review = like.likeable
    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
    end
  end
  @user.reviews.each do |review|
    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
    end
  end
end

json.users do
  json.set! @user.id do
    json.extract! @user, :id, :username, :bio
  end
  like_obj["Review"].each do |like|
    review = like.likeable
    json.set! review.user_id do
      json.extract! review.user, :id, :username, :bio
    end
  end
end

json.likes({})
@user.likes.each do |like|
  json.partial! 'api/likes/like', like: like
end
if current_user
  current_user.likes.each do |like|
    json.partial! 'api/likes/like', like: like
  end
end
[@user_review_likes,@liked_review_likes].each do |like_collection|
  like_collection.each do |like|
    if like
      json.partial! 'api/likes/like', like: like
    end
  end
end

json.films do
  @user.reviews.each do |review|
    film = review.film
    json.set! film.id do
      json.extract! film, :id, :title
      json.poster url_for(film.poster) if film.poster.attached?
    end
  end
  
  like_obj["Film"].each do |like|
    film = like.likeable
    json.set! film.id do
      json.extract! film, :id, :title
      json.poster url_for(film.poster) if film.poster.attached?
    end
  end

  like_obj["Review"].each do |like|
    review = like.likeable
    film = review.film
    json.set! film.id do
      json.extract! film, :id, :title
        json.poster url_for(film.poster) if film.poster.attached?
    end
  end
end

json.lists({})

json.list_elements({})

@user.lists.each do |list|
  json.partial! 'api/lists/preview', list: list
end

like_obj["List"].each do |like|
  list = like.likeable
  json.partial! 'api/lists/preview', list: list
end

json.films({}) if @user.reviews.empty? && @user.likes.empty?