import React, { Component } from 'react';
import './App.css';
function City({name, state, location, population, wages}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        { name }
      </div>
      <div className="card-body">
        <ul>
          <li>{ "State: " + state }</li>
          <li>{ "Location: (" + location + ")"}</li>
          <li>{ "Population (estimated): " + population}</li>
          <li>{ "Total Wages: " + wages }</li>
        </ul>
      </div>
    </div>
  );
}
function ZipSearchField({zipCode, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Zip Code:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={zipCode}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: '',
    }
  }
  zipChanged(event) {
    let zip = event.target.value;
    console.log(zip);

    if (zip.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.setState({
            cities: body
          })
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            cities: []
          })
        })
    } else {
      this.setState({cities: []})
    }
    this.setState({
      zipCode: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <ZipSearchField
                zipCode={this.state.zipCode}
                onChange={(e) => this.zipChanged(e)}
              />
            </div>
          </div>
          {
            this.state.cities.length === 0 ? 
            <h1>No Results</h1> :
            this.state.cities.map((c) => {
              return (
                <div className="row">
                  <div className="col">
                    <City
                      name={c.City + ", " + c.State}
                      state={c.State}
                      location={c.Lat + ", " + c.Long}
                      population={c.EstimatedPopulation}
                      wages={c.TotalWages}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
/*
npm install -g npm@latest
TODO:
- [x] Display more data about each city
- [ ] remove results when extra characters are typed
- [ ] display "no results" if the zip is incorrect instead of empty
- [ ] add checks to prevent multiple requests if we know zip is invalid format
*/