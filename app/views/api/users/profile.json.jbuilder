json.key_format! camelize: :lower

like_obj = @user.likes.group_by(&:likeable_type)
["Review","Film","List"].each{|key| like_obj[key] ||= []}

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

json.reviews({}) if @user.reviews.empty? && @user.likes.where(likeable_type: "Review").empty?

json.users do
  json.set! @user.id do
    json.extract! @user, :id, :username, :bio
  end
  like_obj["Review"].each do |like|
    json.set! like.user_id do
      json.extract! like.user, :id, :username
    end
  end
end

json.likes do
  @user.likes.each do |like|
    json.set! like.id do
      json.extract! like, :id, :user_id, :likeable_type, :likeable_id
      json.created_at like.created_at.to_s
      json.created Time.at(like.created_at).strftime("%B %e, %Y at %I:%M")
    end
  end
end

json.likes({}) if @user.likes.empty?

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

json.films({}) if @user.reviews.empty? && @user.likes.empty?