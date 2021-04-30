import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'
import './weather.css'
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, FormControl, FormHelperText, FormLabel, Input, InputLabel } from '@material-ui/core';

function Weather() {

    const [ zip, setZip ] = useState('')
    const [weather, setWeather ] = useState(null)
    const [unit, setUnit] = useState('imperial')
    const [status, setStatus] = useState(200)

    async function getWeather(){
        try {
            const json = await client.query({
                query: gql`
                query {
                    getWeather(zip:${zip}, units: ${unit}) {
                        temperature
                        description
                        temp_max
                        temp_min
                        feels_like
                        humidity 
                        cod      
                    }
                }
                 `
            })
            console.log(json)
            setWeather(json)
        } catch(err) {
            alert(err.message)
            console.log(err.message)
  
        }
    }
  return (

    <div className="weather">
        <div className="container">
        <form onSubmit={(e) => {
            e.preventDefault()
            getWeather()
        }}>
            <Input
             placeholder='Search Weather...'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            />
       
       <Button type="submit">Submit</Button>
        <FormLabel for='fahrenheit'>Fahrenheit
            <input 
              className='radio' 
              type='radio' 
              name='fahrenheit' 
              value='imperial'
              checked={ unit === "imperial" ? true : false }
              onChange={e => setUnit(e.target.value)}
            />
          </FormLabel>

          <FormLabel for='celcius'>Celcius
            <input 
              className='radio' 
              type='radio' 
              name='celcius' 
              value='metric'
              checked={ unit === "metric" ? true : false }
              onChange={e => setUnit(e.target.value)}
            />
          </FormLabel>



     
        </form>
 
        <div className="weather_display"> 
            {weather ? <h1>Temp: {weather.data.getWeather.temperature}</h1> : null}
            {weather ? <h1>Lows: {weather.data.getWeather.temp_min}</h1> : null}
            {weather ? <h1>Highs: {weather.data.getWeather.temp_max}</h1> : null}
            {weather ? <h1>Feels Like: {weather.data.getWeather.feels_like}</h1> : null}
            {weather ? <h1>Desc: {weather.data.getWeather.description.charAt(0,1).toUpperCase() + weather.data.getWeather.description.slice(1)}</h1> : null}
            {weather ? <h1>Humidity: {weather.data.getWeather.humidity}</h1> : null}
        </div>

   
        </div>
 
    </div>

  );
}

export default Weather
