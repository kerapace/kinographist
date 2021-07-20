json.lists do
  json.set! @list.id do
    json.extract! @list, :id, :user_id, :is_watch_list, :title, :blurb, :ordered, :num_elements
  end
end

json.list_elements do
  json.set! @element.id do
    json.extract! @element, :id, :film_id, :list_id, :ord
  end
end