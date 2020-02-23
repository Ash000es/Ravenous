const apiKey = 'XzUuLRpdnS_tAyeRtuiruHTo154RSFafeUSBkV5FhWXTa3NFhbJTW1ZWbPdbFCE2tu8kKmnrk0zdyrrL5pHlCwl_gbxQ1tIss6dHT_MhtVy05rdoHqvE5vH0elZSXnYx'
export const Yelp = {

  search: (term, location, sortBy) => {
    return window.fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, { headers: { Authorization: `Bearer ${apiKey}` } })
      .then((response) => response.json()
      )
      .then((jsonResponse) => {
        console.log(jsonResponse)
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zipCode,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          })
        }
      })
  }
}
export default Yelp
