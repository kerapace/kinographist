json.people do
  json.set! @person.id do
    json.extract! @person :id, :name
  end
end