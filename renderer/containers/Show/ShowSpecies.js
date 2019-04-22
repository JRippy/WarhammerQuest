import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class ShowRaces extends React.Component {

    constructor(props) {
      super(props);

console.log(this.props);

      this.state = {
        species: null
      }
    }

//To put on Main/Content
  componentDidMount() {
  }

  render() {
    return (
      <div>
      <div className="container">
        <h1 className="display-4">Species</h1>
        <hr/>
        {this.props.species.length == 0 ?
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
          :
          <div className="row">
            {this.props.species.map((specie, index) => (
              <div key={index} className="col-md-10 offset-md-1">
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-title">{specie.name}</h4>
                    <button onClick={() => {this.props.editSpecies(specie)}}>
                      Edit species
                    </button>
                    <button className='delete-button'
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this species?')) this.props.deleteSpecies(specie) } }>
                      Delete species
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
