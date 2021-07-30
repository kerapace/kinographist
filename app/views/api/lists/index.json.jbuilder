json.key_format! camelize: :lower

json.films({})
json.list_elements({})
json.lists({})

@lists.find_each do |list|
  json.partial! 'api/lists/preview', list: list
end