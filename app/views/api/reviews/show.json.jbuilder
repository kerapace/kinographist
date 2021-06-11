json.key_format! camelize: :lower

json.reviews do
  json.set! @review.id do
    json.extract! @review, :id, :film_id, :user_id, :rating, :watched, :title, :body
  end
end

json.users do
  json.set! @review.user_id do
    json.extract! @review.user, :id, :username
  end
end