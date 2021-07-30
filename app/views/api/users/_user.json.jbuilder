json.extract! user, :id, :username, :email, :bio, :created_at, :watch_count, :likes_count
json.created_at user.created_at.to_s
json.updated_at user.updated_at.to_s
json.created Time.at(user.created_at).strftime("%B %e, %Y at %I:%M")
json.updated Time.at(user.updated_at).strftime("%B %e, %Y at %I:%M")