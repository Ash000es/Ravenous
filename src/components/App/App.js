import React from 'react'
import './App.css'

import BusinessList from '../BusinessList/BusinessList'
import SearchBar from '../SearchBar/SearchBar'
import { Yelp } from '../../util/Yelp'
const apiKey =
  'XzUuLRpdnS_tAyeRtuiruHTo154RSFafeUSBkV5FhWXTa3NFhbJTW1ZWbPdbFCE2tu8kKmnrk0zdyrrL5pHlCwl_gbxQ1tIss6dHT_MhtVy05rdoHqvE5vH0elZSXnYx'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      businesses: []
    }
    this.searchYelp = this.searchYelp.bind(this)
  }

  componentDidMount () {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tacos&location=london&sort_by=best_match',
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse)
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          })
        }
      }).then(res => {
        this.setState({ businesses: res })
        console.log(res)
      })
  }

  searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy).then(res => {
      this.setState({ businesses: res })
      console.log(res)
    })
  }

  render () {
    return (
      <div className='App'>
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    )
  }
}

export default App
