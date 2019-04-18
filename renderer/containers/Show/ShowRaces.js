import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class ShowRaces extends React.Component {

    constructor(props) {
      super(props);

//console.log(this.props);

      this.state = {
        monsterInputSpecies: '',
        monsterInputRace: '',
        racesData: this.props.races,
        race: null,
        races: [],
      }
    }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Races</h1>
          <hr/>
          {this.props.races.length == 0 ?
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                </div>
              </div>
            </div>
            :
            <div className="row">
              {this.props.races.map((race, index) => (
                <div key={index} className="col-md-10 offset-md-1">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="text-title">{race.name}</h4>
                      <h6 className="text-muted">Species: {race.species}</h6>
                      <button onClick={() => {this.props.editRace(race)}}>
                        Edit race
                      </button>
                      <button onClick={() => alert('Delete in progress')}>
                        Delete race....
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        <style jsx>{`
          div {
            height: auto;
          }
          #content {
            padding: 25px 0;
          }
          .progress-bar {
            height: 15px;
          }
          `}</style>
      </div>
      );
    }
  }
