json.extract! review, :id, :user_id, :film_id, :rating, :watched, :title, :body
json.created_at review.created_at.to_s
json.updated_at review.updated_at.to_s
json.created Time.at(review.created_at).strftime("%B %e, %Y at %I:%M")
json.updated Time.at(review.updated_at).strftime("%B %e, %Y at %I:%M")