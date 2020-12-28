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
            const summary = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const rainPred = body.current.precip 
            const windSpeed = body.current.wind_speed
            const humid = body.current.humidity
            callback(undefined,`Overal: ${summary} with a ${rainPred}% chance of rain. 
            Temperature at ${temp}C - wind speed  ${windSpeed} klm and humidity at ${humid}%.`)
        }
    })
}

module.exports = forecast