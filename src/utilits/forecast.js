const request = require('request')
const geocode = require('../utilits/geocode')


forecast = (latitude, longetude, callBackForecast) => {
    const weatherUrl ='http://api.weatherstack.com/current?access_key=58c198375d626114b60fe626cc19d71b&query='+ latitude+','+ longetude+''

    //const weatherUrl = 'http://api.weatherstack.com/current?access_key=58c198375d626114b60fe626cc19d71b&query=32.57639,-25.91528'
    request({ url: weatherUrl, json:true}, (errorForecast, {body}) => {
    if (errorForecast){
        callBackForecast('Unable to connect to weather service!', undefined)
    }

    else if(body.success === false){
        //console.log(Response.body)
        callBackForecast('Sorry, type the city again! Beacuse, '+ body.error.info, undefined)
       
    }
    else{    
        console.log(body)
        callBackForecast(undefined,'It is currently: ' + body.current.temperature + '  degress and it feelslike: ' + body.current.feelslike + ' degress and it is ' + body.current.weather_descriptions[0])
        //callBackForecast(undefined, '' +  Response.body.current.temperature)
    }
})}
module.exports = forecast