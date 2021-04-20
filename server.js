// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')


const cors = require('cors')


const fetch = require('node-fetch')
// require dotenv and call cofig
require('dotenv').config()


const schema = buildSchema(`
# schema here
enum Units {
    standard
    metric
    imperial
}

type Weather {
    temperature:  Float!
    description: String!
    feels_like: Float!
    temp_min: Float!
    temp_max: Float!
    pressure: Float!
    humidity: Float!
    cod: String!
    message: String!
    
}

type Query {
    getWeather(zip: Int!, units: Units,): Weather!
}
    

`)

const root = {
    getWeather: async ({ zip, units = 'imperial' }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
          const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
          const res = await fetch(url)
          const json = await res.json()
          const status = parseInt(json.cod)
          const message = json.message
          if( status != 200){
              return {status, message}
          } 
					const temperature = json.main.temp
					const description = json.weather[0].description
					const feels_like = json.weather[0].feels_like
					const temp_min = json.weather[0].temp_min
					const temp_max = json.weather[0].temp_max
          
          return { temperature, description, 
           feels_like, temp_min, temp_max, status }
        
      }
  }
  

// Create an express app
const app = express()
app.use(cors())




// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))
 
  

  // Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
