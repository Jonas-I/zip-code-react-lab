import React, { Component } from 'react';
import './App.css';
// function City({ city, zipcode }) {
//     return (
//         <div className="card mb-4">
//             <div className="card-header">
//                 {city}
//             </div>
//             <div className="card-body">
//                 <ul>
//                     <li>{zipcode}</li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

function CitySearchField({ cityName, onChange }) {
    return (
        <div>
            <form className="form-inline my-4">
                <label><br></br><strong>City: </strong></label>
                <input
                    type="text"
                    className="form-control ml-2"
                    value={cityName}
                    onChange={onChange}
                />
            </form>
            <br></br>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCodes: [],
            city: ''
        }
    }

    cityNameChanged(event) {
        const cityName = event.target.value.toUpperCase();
        console.log(cityName);

        fetch(`http://ctp-zip-api.herokuapp.com/city/${cityName}`)
            .then((res) => res.json())
            .then((body) => {
                console.log(body);
                this.setState({
                    zipCodes: body
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    zipCodes: []
                })
            })
        this.setState({
            city: event.target.value
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>City Search</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <CitySearchField
                            onChange={(e) => this.cityNameChanged(e)}
                        />
                    </div>
                </div>
                {
                    this.state.zipCodes.length === 0 ?
                        <h1>No Results</h1> :
                        this.state.zipCodes.join(", ")
                }
            </div>
        );
    }
}
export default App;