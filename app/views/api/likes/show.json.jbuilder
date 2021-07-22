json.key_format! camelize: :lower

json.extract! @like, :id, :user_id, :likeable_type, :likeable_id
json.created_at @like.created_at.to_s
json.created Time.at(@like.created_at).strftime("%B %e, %Y at %I:%M")