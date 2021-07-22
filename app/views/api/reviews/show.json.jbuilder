json.key_format! camelize: :lower

json.reviews do
  json.set! @review.id do
    json.extract! @review, :id, :user_id, :film_id, :rating, :watched, :title, :body, :likes_count
    json.created_at @review.created_at.to_s
    json.updated_at @review.updated_at.to_s
    json.created Time.at(@review.created_at).strftime("%B %e, %Y at %I:%M")
    json.updated Time.at(@review.updated_at).strftime("%B %e, %Y at %I:%M")
  end
end

json.users do
  json.set! @review.user_id do
    json.extract! @review.user, :id, :username
  end
end