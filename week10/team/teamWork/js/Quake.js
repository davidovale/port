import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    
    this._quakes = [];
  }

  // If in region doesn't have quakes, you can change the value of ${radius} to increase the verified area. In my case, I putted 10000  
  async getEarthQuakesByRadius(position, radius = 100) {
    this._quakes = await getJSON(
      this.baseUrl +
        `&starttime=2022-06-23&endtime=2022-10-05&latitude=${
          position.lat
        }&longitude=${position.lon}&maxradiuskm=${radius}`
    );
    return this._quakes;
  }
  getQuakeById(id) {
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}