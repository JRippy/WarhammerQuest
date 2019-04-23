import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class EditRace extends React.Component {
  constructor(props) {
    super(props);

console.log(this.props);

    this.state = {
      updatingToDB: false,
      updateSuccess: false,
      race: this.props.race,
      species: [],
      monsters: this.props.monsters,
      races: this.props.races,
      raceInputName: this.props.race.name,
      raceInputSpecies: this.props.race.species,
      raceInputIDSpecies: this.props.race.idSpecies,
      selectedSpecies: false
      //loadingRace: true
    }

  }

  onChangeSpecies(selected) {
    this.setState({selectedSpecies: true, raceInputSpecies: selected.name, raceInputIDSpecies: selected._id.toString()});
  }

  refreshListMonsters(){

    //var displayList = this.state.monsters;
    var displayList = [];
    var monstersTmp = {};

    this.state.monsters.map((monster, indexM) => {
        if (monster.idRace == this.state.race._id.toString()) {

          monstersTmp = {
            _id : monster._id,
            name : monster.name,
            species : this.state.race.species,
            idSpecies : this.state.race.idSpecies,
            race : this.state.race.name,
            idRace : this.state.race._id.toString()};

          displayList = displayList.concat(monstersTmp);

          //UpdateDataBase
          const self = this;
          MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
            co(function*() {
              try {

                const result = yield client.db("WarhammerQuest").collection('Monsters').updateOne(
                  { name: monster.name },
                  {
                      $set: {
                        name: monster.name,
                        species: self.state.race.species,
                        race:  self.state.race.name,
                        idSpecies: self.state.race.idSpecies,
                        idRace: self.state.race._id.toString()},
                    $currentDate: { lastModified: true }
                  }
                );

                const monster1 = result.result.ok;

                if (monster1 == 1) {
                  console.log(monster.name + "Monster Updated");
                }
                else {
                  console.log(monster.name + "Monster Fail Update");
                }

              } catch (e) {
                console.log(e);
              }
              client.close();
            })
          });

        }
        else {

          this.state.races.map((race, indexR) => {

            if (monster.idRace == race._id.toString()) {

              monstersTmp = {
                _id : monster._id,
                name : monster.name,
                species : race.species,
                idSpecies : race.idSpecies,
                race : race.name,
                idRace : race._id.toString()
              };

              displayList = displayList.concat(monstersTmp);
            };
          });
        }
    });

    this.props.updateMonsters(displayList);

    this.setState({
      monsters : displayList
    });

    return displayList;
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
                  species: self.state.raceInputSpecies,
                  idSpecies: self.state.raceInputIDSpecies},
              $currentDate: { lastModified: true }
            }
          );

          const race1 = result.result.ok;

          if (race1 == 1) {
            console.log("Race Updated");

            var raceEdited = self.state.race;
            raceEdited.name = self.state.raceInputName;
            raceEdited.species = self.state.raceInputSpecies;
            raceEdited.idSpecies = self.state.raceInputIDSpecies;

            self.setState({
              race: raceEdited,
              updatingToDB: false,
              updateSuccess: true,
              raceInputName: '',
              raceInputSpecies: '',
              raceInputIDSpecies: ''
            });

            self.props.editRace(self.state.race);

            self.refreshListMonsters();

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
