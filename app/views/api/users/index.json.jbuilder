json.users do
  @users.find_each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end