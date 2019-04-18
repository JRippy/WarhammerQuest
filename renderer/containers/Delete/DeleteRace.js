import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class CreateRace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      raceInputName: '',
      raceInputSpecies: '',
      insertingToDB: false,
      insertSuccess: false,
      race: null,
      selectedSpecies: false,
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Delete Race</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.raceInputName} onChange={(event) => this.setState({raceInputName: event.target.value})}/>
                </div>
                <div className="form-group">
                  <label htmlFor="species">Species:</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable={false}
                    isSearchable={true}
                    name="color"
                    options={this.props.species}
                    onChange={(selected) => this.onChangeSpecies(selected)}
                  />
                </div>
                {this.state.selectedSpecies ?
                  <div>
                        {this.state.insertingToDB ?
                          <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                          </div>
                          :
                          <div>
                            <button className="btn btn-outline-dark" onClick={() => this.addRaceToDB()}>Add Race</button>
                          </div>
                        }
                      </div>
                  : ''
                }
                {this.state.insertSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Race Added</span></h3>
                    <h6>{this.state.race.name}</h6>
                    <h6 className="text-muted">Species: {this.state.race.species}</h6>
                  </div>
                  : ''
                }
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .css-xp4uvy,
          .css-1492t68 {
            padding-top: 5px;
          }
          .css-15k3avv {
            height: auto;
            max-height: 300px;
            overflow-y: auto;
          }
        `}</style>
      <style jsx>{`
        div {
          height: auto;
        }
        .progress-bar {
          height: 15px;
        }
        .addMonsterCard {
          margin-top: 150px;
        }
        `}</style>

        </div>
      );
    }

    onChangeSpecies(selected) {
      console.log(selected);
      this.setState({selectedSpecies: true, raceInputSpecies: selected.name});
    }

    addRaceToDB() {
      const self = this;
      self.setState({insertingToDB: true, insertSuccess: false});
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          try {
            const result = yield client.db("WarhammerQuest").collection('Race').insertOne({
              "name": self.state.raceInputName,
              "species": self.state.raceInputSpecies,
            });

            console.log(result.ops[0]);
            const race = result.ops[0];
            self.props.addRace(race);

            self.setState({
              insertingToDB: false,
              insertSuccess: true,
              raceInputName: '',
              raceInputSpecies: '',
              race: race,
              selectedSpecies: false
            });
          } catch (e) {
            console.log(e);
          }
          client.close();
        })
      });
    }
  }
