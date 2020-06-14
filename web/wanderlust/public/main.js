// Foursquare API Info
const clientId = ''; // add your own here
const clientSecret = ''; // add your own here
const url = 'https://api.foursquare.com/v2/venues/explore' + '?near=';

// OpenWeather Info
const openWeatherKey = ''; // add your own here
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val()
  const urlToFetch = url + city + "&limit=10" + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + '20200614'
  try{
    const response = await fetch(urlToFetch)
    if (response.ok){
      const jsonResponse = await response.json()
      const venues = jsonResponse.response.groups[0].items.map((element) => {
        return element.venue
      })
      console.log(venues)
      return venues
    }
  }
  catch(error){
    console.log(error)
  }
}

const getForecast = async () => {
  const urlToFetch = weatherUrl + '?q=' + $input.val() + '&appid=' + openWeatherKey;

  try{
    const response = await fetch(urlToFetch)
    if (response.ok){
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      return jsonResponse
    }
  }
  catch(error){
    console.log(error)
  }
}


// Render functions
const renderVenues = (venues) => {
  let totalVenuesToDisplay = 4
  let totalVenues = venues.length
  let indices = []
  while (indices.length < totalVenuesToDisplay){
    let index = Math.floor(Math.random() * totalVenues)
    if (indices.indexOf(index) === -1){
      indices.push(index)
    }
  }
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venueName = venues[indices[index]].name
    const venueLocation = venues[indices[index]].location
    const venueIcon = venues[indices[index]].categories[0].icon
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix
    let venueContent = createVenueHTML(venueName, venueLocation, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues))
  getForecast().then(forecast => renderForecast(forecast))
  return false;
}

$submit.click(executeSearch)