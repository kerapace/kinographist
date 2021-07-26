json.key_format! camelize: :lower

json.users do
  json.set! @list.user.id do
    json.partial! '/api/users/user', user: @list.user
  end
end

json.films do
  @list.elements.each do |el|
    json.set! el.film.id do
      json.partial! 'api/films/film_verbose', film: el.film
    end
  end
end

json.lists do
  json.set! @list.id do
    json.extract! @list, :id, :user_id, :is_watch_list, :title, :blurb, :ordered, :num_elements
  end
end

json.list_elements do
  @list.elements.each do |el|
    json.set! el.id do
      json.extract! el, :id, :film_id, :list_id, :ord
    end
  end
end