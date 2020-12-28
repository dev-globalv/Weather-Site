const request = require('postman-request')
const chalk = require('chalk')


const forecast = (latitude , longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d09b682962e042bfb024c3250b49cfbf&query=' + latitude + ',' +  longtitude + '&units=m'

    request({ url, json: true}, (error, {body}) => {
        if (error){
            console.log(chalk.red.inverse('Unable to connect to weather service'), undefined)
        } else if (body.error) {
            console.log(chalk.red.inverse('Unable to find location'), undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress Celcius out."+"With a " + body.current.precip + "% chance of rain!")
        }
    })
}

module.exports = forecast