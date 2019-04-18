import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class EditRace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingToDB: false,
      updateSuccess: false,
      race: this.props.race,
      species: [],
      raceInputName: this.props.race.name,
      raceInputSpecies: this.props.race.species,
      selectedSpecies: false,
      //loadingRace: true
    }

  }

  onChangeSpecies(selected) {
    this.setState({selectedSpecies: true, raceInputSpecies: selected.name});
  }

  editRaceToDB() {
    const self = this;
    self.setState({updatingToDB: true, updateSuccess: false});
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        try {

          const result = yield client.db("WarhammerQuest").collection('Race').updateOne(
            { name: self.state.race.name },
            {
                $set: {
                  name: self.state.raceInputName,
                  species: self.state.raceInputSpecies},
              $currentDate: { lastModified: true }
            }
          );

          const race1 = result.result.ok;

          const raceNameEdited = self.state.raceInputName;
          const raceSpeciesEdited = self.state.raceInputSpecies;

          if (race1 == 1) {
            console.log("Race Updated");

            var raceEdited = self.state.race;
            raceEdited.name = raceNameEdited;
            raceEdited.species = raceSpeciesEdited;

            self.setState({
              race: raceEdited,
              updatingToDB: false,
              updateSuccess: true
            });

            self.props.editRace(self.state.race);
          }
          else {
            console.log("Race Fail Update");
          }

        } catch (e) {
          console.log(e);
        }
        client.close();
      })
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Edit Race : {this.props.race.name}</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input  type="text" className="form-control"
                          id="name" placeholder="Name"
                          value={this.state.raceInputName}
                          onChange={(event) => this.setState({raceInputName: event.target.value})}
                          />
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
                    defaultValue={{ label: this.state.race.species, value: 0 }}
                    onChange={(selected) => this.onChangeSpecies(selected)}
                  />
                </div>
                {this.state.selectedSpecies ?
                  <div>
                        {this.state.updatingToDB ?
                          <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                          </div>
                          :
                          <div>
                            <button className="btn btn-outline-dark" onClick={() => this.editRaceToDB()}>Edit Race</button>
                          </div>
                        }
                      </div>
                  : ''
                }
                {this.state.updateSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Race Edited</span></h3>
                    <h6>{this.state.race.name}</h6>
                    <h6 className="text-muted">Species: {this.state.race.species}</h6>
                  </div>
                  : ''
                  // <div>
                  //   <h3><span className="badge badge-danger">Race not Edited</span></h3>
                  // </div>
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

  }
