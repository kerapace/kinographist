# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Film.destroy_all
Person.destroy_all
FilmCrew.destroy_all


Film::populate_films!(6609,592,473033,9603,615457,129,496243,389,769,346,510,378064,342857,599,128,3082,598,901,5156,398818,299536,490,508442,694,629)

User.create(username: "guest", email: "exampleemail@y.nuuu",password: "123456")