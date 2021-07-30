json.likes({})

@lists.find_each do |list|
  json.partial! 'api/lists/preview', list: list
end