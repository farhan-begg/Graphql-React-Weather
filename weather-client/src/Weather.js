import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'

function Weather() {

    const [ zip, setZip ] = useState('')
    const [weather, setWeather ] = useState(null)

    async function getWeather(){
        try {
            const json = await client.query({
                query: gql`
                query {
                    getWeather(zip:${zip}) {
                        temperature
                        description
                        temp_max
                        temp_min
                        feels_like
                        humidity       
                    }
                }
                 `
            })
            console.log(json)
            setWeather(json)
        } catch(err) {
            console.log(err.message)
        }
    }
  return (
    <div className="Weather">
        <section>
            {weather ? <h1>Temp: {weather.data.getWeather.temperature}℉</h1> : null}
            {weather ? <h1>Lows: {weather.data.getWeather.temp_min}℉</h1> : null}
            {weather ? <h1>Highs: {weather.data.getWeather.temp_max}℉</h1> : null}
            {weather ? <h1>Feels Like: {weather.data.getWeather.feels_like}℉</h1> : null}
            {weather ? <h1>Desc: {weather.data.getWeather.description.charAt(0,1).toUpperCase() + weather.data.getWeather.description.slice(1)}</h1> : null}
            {weather ? <h1>Humidity: {weather.data.getWeather.humidity}</h1> : null}
        </section>
        <form onSubmit={(e) => {
            e.preventDefault()
            getWeather()
        }}>
            <input 
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Weather
