# kinographist

Kinographist is an attempt at cloning most of the base features of Letterboxd, a social film discovery site that allows users to catalog, rate, and review their watched and liked films.

## Letterboxd
Letterboxd features an extensive catalog of films populated via an external API and integrates information obtained so such as actors, plot summaries, streaming options into a compact user experience, as well as highly-customizable search and discovery features. In addition, Letterboxd contains social integration, allowing users to comment on reviews and create their own personal posts associated with their personal userpage. Kinographist plans to implement most of these features and mimic the site's styling, albeit on a much smaller scale.

## Kinographist again

I managed to replicate most of the base interactive functionality, but ultimately my ability to fully furnish the site was limited by the decision to make the site in pure React, as every additional component increased the size of the resulting site by a significant margin. Nonetheless, I think that what I've done stands pretty well.

## How to use

In order to use this site, after logging in or signing up, navigate to a film page and then look at the menu on the right:

![chrome_2021-08-09_12-52-38](https://user-images.githubusercontent.com/74376627/128747468-ac3068fa-9325-48ac-8070-418fa7c0b9bb.png)

There are options to toggle whether or not you've seen a film, whether you've liked a film, or whether to add it to your list of films to watch. You can also rate a film (which will automatically mark it as watched by default).
There's also an option to review a film, which you can access by clicking on this button:

![chrome_2021-08-09_13-26-56](https://user-images.githubusercontent.com/74376627/128748138-27f5dfb4-5d1e-44f5-ac48-92922ed72548.png)

Upon clicking on this, you are transported to a modal which lets you fill out a form corresponding to your review:

![chrome_2021-08-09_13-24-52](https://user-images.githubusercontent.com/74376627/128747951-9d83450b-61c7-4ddd-8883-ca203e95e4d0.png)

Clicking submit will cause your review to appear on the main page:

![chrome_2021-08-09_13-25-04](https://user-images.githubusercontent.com/74376627/128747977-0db8d5f7-929e-435b-9735-d84e5f1cf6aa.png)

You can also create a custom list, by navigating to the "Lists" tab in the top left and clicking on the header:

![chrome_2021-08-09_12-52-13](https://user-images.githubusercontent.com/74376627/128747582-cd615905-c944-404e-807b-fb5a52e9cd59.png)

After creating a list, options to add and remove items to that list will appear on a particular film page: 

![chrome_2021-08-09_13-28-32](https://user-images.githubusercontent.com/74376627/128748380-e86049af-fb3d-49ad-8252-73b247443598.png)

![chrome_2021-08-09_13-28-52](https://user-images.githubusercontent.com/74376627/128748402-240bc7d9-6186-4acb-b04d-95904093da20.png)

You can like other users' reviews and lists, and liking them will cause them to be syndicated on your profile page:

![chrome_2021-08-09_13-31-56](https://user-images.githubusercontent.com/74376627/128748703-e68451a9-9290-44af-8178-2685a8bb2544.png)


## Behind the scenes

## Backend

### Obtaining data

As Letterboxd uses the [free, publically available tMDb API](https://www.themoviedb.org/), it was a pretty simple matter to ensure that I'd have all the film information I needed on the site I was making. As I was making a simple proof-of-concept site, I wanted to only show a small number of films so it wouldn't be prohibitively difficult to populate the site with review and list data. With that in mind, using the extensive tMDb searching options didn't make sense, so I went through the effort of scraping the API data from tMDb in order to populate my own database. I used the rails `URI` and `Net::HTTP` built-in libraries to make the requests to the API, and then created several factory methods to extract the film data from the response JSON and then save it to my database using ActiveRecord:

```ruby
  def self.populate_films!(*ids)
    film_list = []
    ids.each do |id|
      film_list << Film.populate_film!(id)
    end
    film_list
  end

  def self.populate_film!(id)
    response = Film.request_film(id)
    film = Film.new(Film.extract_film_data(response))
    film.save!
    backdrop = film.backdrop.attach(io: Film.request_image(response["backdrop_path"],"w1280"), filename: "#{film[:id]}-backdrop.jpg")
    poster = film.poster.attach(io: Film.request_image(response["poster_path"],"w780"), filename: "#{film[:id]}-poster.jpg")
    Film.populate_people(response)
    film
  end

  def self.request_film(tmdb_id)
    uri = URI.parse("https://api.themoviedb.org/3/movie/#{tmdb_id}?api_key=#{Rails.application.credentials.dig(:tmdb_api_key)}&language=en-US&append_to_response=credits")
    JSON.parse(Net::HTTP.get_response(uri).body)
  end

  def self.request_image(filename, size)
    URI.open("http://image.tmdb.org/t/p/#{size}/#{filename}")
  end
```

### Searching data

As my application developed, I found that I had to write a function to let the user search my database of films based on certain classifications (by genre, by decade, and by spoken language). Because I wanted to do it in a way that would have made sense even if the application had thousands of films, I elected to do this filtering on the backend. I wrote a class method on the Film model that reduced a list of lists of classifiers into chains of ActiveRecord queries, which would then be lazily evaluated in one database request:

```ruby
  def self.reduce_constraints(*constraints)
    return constraints.inject(Film){|relation,constraint| apply_constraint(relation,constraint)}.where(nil)
  end

  def self.apply_constraint(relation,constraint)
    case constraint[0]
    when "year"
      relation.where(release_year: Integer(constraint[1]))
    when "decade"
      relation.where('(release_year/10)*10 = ?',constraint[1])
    when "actor" || "director" || "writer" || "producer" || "composer"
      relation.joins(:contributions).where('position = ? AND person_id = ?',constraint[0],constraint[1])
    when "language"
      relation.where("? = ANY (languages)",constraint[1].capitalize)
    when "genre"
      relation.where("? = ANY (genres)", constraint[1].capitalize)
    end
  end
```

## Frontend

On the frontend, there were a lot of components to write-- components for display pages for the film, components to display embedded objects (like films, lists, or reviews) and lists thereof, including lists of heterogenous types of components (found in the like feed on the user page). These necessitated writing a lot of complicated selector logic, like this one, which gets a list of all the user-created lists associated with a given film:

```javascript
export const listPreviewsByFilmId = (state,filmId) => {
  const lists = Object.values(state.entities.listElements)
    .filter(element => element.filmId === filmId)
    .map(element => state.entities.lists[element.listId])
    .filter(list => !list.isWatchList)
    .map(list => Object.assign({},list,
      {
        elements: listWithFilmData(state,list.id).slice(0,5),
        user: state.entities.users[list.userId],
      }
    ));
  return lists;
}
```

The vast majority of the interactive logic for my site lies in the rating menu component. Here's an example subcomponent from the menu, corresponding to the rating menu. It creates 10 flexbox components for each rating that react to mouseenter, mouseleave, and click objects:

```javascript
const RatingButton = ({rating, userId, filmId, updateReview}) => {
  const [hoverRating, setHoverRating] = useState(rating);
  const [displayRating, setDisplayRating] = useState(rating);
  useEffect(() => {
    setDisplayRating(rating);
    setHoverRating(rating)
  },[rating]);
  return (
    <>
      <div className="exit-button">
        <a onClick={e => {
          updateReview({userId, filmId, rating: 0});
          setHoverRating(0);
        }}>X</a>
      </div>
      <div className={classNames("rating-button",{"rated": rating !== 0 && displayRating === hoverRating})}
        onMouseLeave={() => setHoverRating(displayRating)}>
        <div className="visible-rating" style={{width: `${hoverRating*20}%`}}/>
        {[...Array(10)].map((_,idx) => (
          <RatingIncrement key={idx} rating={(idx+1)/2} {...{updateReview,userId,filmId,setHoverRating,setDisplayRating}}/>
        ))}
      </div>
    </>
  );
};

const RatingIncrement = ({rating,updateReview, userId, filmId, setHoverRating, setDisplayRating}) => (
  <div className="rating-increment" onMouseEnter={() => setHoverRating(rating)} onClick={() => {
    setDisplayRating(rating);
    updateReview({rating,userId,filmId,watched: true});
  }}/>
);
```

for the CSS styling, absolute positioning, z-index, and SVG masking are used to create the effect of the stars:

```css
.rating-button {
  height: 30px;
  width: 150px;
  position: relative;
  display: flex;
  background: $dark-grey;
  -webkit-mask-image: image-url("star.svg");
  mask-image: image-url("star.svg");
  -webkit-mask-size: 30px 30px;
  mask-size: 30px 30px;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
}

div.visible-rating {
  background-color: #59f;
  position: absolute;
  height: 100%;
  z-index: -2;
  top: 0;
  left: 0;
}

div.rating-button.rated > div.visible-rating {
  background-color: #5e7;
}
```
