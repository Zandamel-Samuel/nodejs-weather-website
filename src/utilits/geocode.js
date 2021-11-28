const request = require('request')
const { send } = require('process')


const geocode = (address, callback) => {
    //const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Maputo.json?access_token=pk.eyJ1IjoiYmxhY2tib3gtY3liZWRldiIsImEiOiJja3VsbnQ2dnAzamZsMm5tbzFxNHpza2owIn0.FKd4bAGzG9pV8mnyCNjHgg'
  const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYmxhY2tib3gtY3liZWRldiIsImEiOiJja3VsbnQ2dnAzamZsMm5tbzFxNHpza2owIn0.FKd4bAGzG9pV8mnyCNjHgg'

  request ({url: geocodeUrl, json: true}, (error, {body= 'none'} = {}) => {
    
  if (error) {
      callback ('Service is down, please restart your service!')
  }

  /*else if (body = 'none'){
      console.log(body)
      callback ('We cant see you')
      
  }*/
  else{
     // console.log(body)
      callback(undefined, {
          longetude: body.features[4].center[0],
          latitude: body.features[4].center[1],
          detail: body.features[4].place_name
      } )      
     // callback (latitude + ',' + longetude)
  }
})}


module.exports = geocode