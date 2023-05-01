# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Film.destroy_all
# Person.destroy_all
# FilmCrew.destroy_all
User.destroy_all
Like.destroy_all
Review.destroy_all
List.destroy_all
ListElement.destroy_all

Film::populate_films!(6609,592,473033,9603,615457,129,496243,389,769,346,510,378064,342857,599,128,3082,598,901,5156,398818,299536,490,508442,694,629)

keoma = Film.find_by(tmdb_id: 6609)
uncutgems = Film.find_by(tmdb_id: 473033)
seventhseal = Film.find_by(tmdb_id: 490)


user1 = User.create(username: "guest", email: "exampleemail@y.nuuu",password: "123456")
user2 = User.create(username: "leonefan68", email: "nonono@why.why", password: "rewritable")
user3 = User.create(username: "cinnamontography", email: "laughaminute@joker.yes", password: "heckyeah")
user4 = User.create(username: "nightwatchman", email: "iiiii@iii.iii", password: "hahayes")
user5 = User.create(username: "queergenarowlands", email: "superstructure@wesleyan.edu", password: "awerbuxoxnw")
review1 = Review.create(user_id: user2.id,
  film_id: keoma.id,
  watched: true,
  rating: 4.5,
  title: "One of the best spaghetti westerns you've never heard of", 
  body: ["From the genre's twilight years comes a strange epic, filled with violence and meditative ruminations ",
    "on the nature of violence. Aesthetically quirky, with fast-cranked action and an opening theme that wouldn't be out of place in a Jim ",
    "Henson fantasy feature, Keoma tells a powerful story about a half-Indian mountain man who fights to liberate ",
    "a woman he loves from a brutal labor camp and regain the honor his siblings have denied him."
  ].join("")
)

review2 = Review.create(user_id: user3.id,
  film_id: keoma.id,
  watched: true,
  rating: 3,
  body: ["The storyline is compelling on paper, and the location shooting is amazing, but confusing choices of direction ",
    "and an outsourced, piecemeal script make this one hard to enjoy if you're not committed. Recommended if you like the genre."
  ].join("")
)

review3 = Review.create(user_id: user4.id,
  film_id: keoma.id,
  watched: true,
  rating: 4,
  body: "When the opening theme starts me and the boys are caterwauling together like we're all singing 'Big Rock Candy Mountain'"
)

review4 = Review.create(user_id: user3.id,
  film_id: uncutgems.id,
  watched: true,
  rating: 5,
  title: "The tensest movie produced in the past decade.",
  body: "The Safdie brothers have, with this film, managed to carve out a unique genre niche: they've taken the palpable tension and lived-in realism of classic New Hollywood filmmaking and combined it with the natural, shaggy uncomfortableness of their mumblecore roots, forming a new, stressful, unquestionably modern brand of cinema. Nothing else would have sufficed to bring out the grit and glamor of the life of Howard Ratner, in a performance given life by an unconventional and much-discussed star turn by Adam Sandler."
)

review5 = Review.create(user_id: user5.id,
  film_id: seventhseal.id,
  watched: true,
  rating: 4
)

review6 = Review.create(user_id: user5.id,
  film_id: uncutgems.id,
  watched: true,
  rating: 4,
  body: "Never before have I watched a film so greasy, so laced in machismo, so filled with shouting and clamor and unpleasant noises, and enjoyed it this much"
)

Like.create(user_id: user3.id, likeable_type: "Review", likeable_id: review3.id)
Like.create(user_id: user2.id, likeable_type: "Review", likeable_id: review3.id)
Like.create(user_id: user4.id, likeable_type: "Review", likeable_id: review1.id)
Like.create(user_id: user2.id, likeable_type: "Film", likeable_id: keoma.id)
Like.create(user_id: user4.id, likeable_type: "Review", likeable_id: review4.id)
Like.create(user_id: user5.id, likeable_type: "Review", likeable_id: review5.id)
Like.create(user_id: user4.id, likeable_type: "Film", likeable_id: uncutgems.id)
Like.create(user_id: user4.id, likeable_type: "Review", likeable_id: review6.id)
