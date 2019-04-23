import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class EditMonster extends React.Component {
  constructor(props) {
    super(props);
//
// console.log(this);
// console.log(this.props);
    this.state = {
      updatingToDB: false,
      updateSuccess: false,
      species: this.props.aSpecies,
      monsters: this.props.monsters,
      races: this.props.races,
      speciesInputName: this.props.aSpecies.name,
      speciesInputIDName: this.props.aSpecies.idSpecies,
      selectedSpecies: false,
      loadingRace: true,
    }
  }

  refreshListMonstersAndSpecies(){

    var displayList = [];
    var monstersTmp = {};

    this.state.monsters.map((monster, indexM) => {
        if (monster.idSpecies == this.state.species._id.toString()) {

          monstersTmp = {
            _id : monster._id,
            name : monster.name,
            species : this.state.species.name,
            idSpecies : this.state.species._id.toString(),
            race : monster.race,
            idRace : monster.idRace};

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
                        species : self.state.species.name,
                        idSpecies : self.state.species._id.toString(),
                        race : monster.race,
                        idRace : monster.idRace},
                    $currentDate: { lastModified: true }
                  }
                );

                const monster1 = result.result.ok;

                if (monster1 == 1) {
                  console.log(monster.name + " Monster Updated");
                }
                else {
                  console.log(monster.name + " Monster Fail Update");
                }

              } catch (e) {
                console.log(e);
              }
              client.close();
            })
          });

        }
        else {


              monstersTmp = monster;

              displayList = displayList.concat(monstersTmp);


        }
    });

//Update Races
    var displayListR = [];
    var raceTmp = {};

    this.state.races.map((race, indexM) => {
        if (race.idSpecies == this.state.species._id.toString()) {

          raceTmp = {
            _id : race._id,
            name : race.name,
            species : this.state.species.name,
            idSpecies : this.state.species._id.toString()};

          displayListR = displayListR.concat(raceTmp);

          //UpdateDataBase
          const self = this;
          MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
            co(function*() {
              try {

                const result = yield client.db("WarhammerQuest").collection('Race').updateOne(
                  { name: race.name },
                  {
                      $set: {
                        name: race.name,
                        species : self.state.species.name,
                        idSpecies : self.state.species._id.toString()},
                    $currentDate: { lastModified: true }
                  }
                );

                const race1 = result.result.ok;

                if (race1 == 1) {
                  console.log(race.name + " Race Updated");
                }
                else {
                  console.log(race.name + " Race Fail Update");
                }

              } catch (e) {
                console.log(e);
              }
              client.close();
            })
          });

        }
        else {

          displayListR = displayListR.concat(race);

        }
    });




    this.props.updateMonsters(displayList);
    this.props.updateRaces(displayListR);

    this.setState({
      monsters : displayList,
      races : displayListR
    });
    //return displayList;
  }

  editSpeciesToDB() {
    const self = this;
    self.setState({updatingToDB: true, updateSuccess: false});
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        try {

          const result = yield client.db("WarhammerQuest").collection('Species').updateOne(
            { name: self.state.species.name },
            {
                $set: {
                  name: self.state.speciesInputName},
              $currentDate: { lastModified: true }
            }
          );

          const species1 = result.result.ok;

          if (species1 == 1) {
            console.log("Species Updated");

            var speciesEdited = self.state.species;
            speciesEdited.name = self.state.speciesInputName;
            speciesEdited.value = self.state.speciesInputName;
            speciesEdited.label = self.state.speciesInputName;

            self.setState({
              species: speciesEdited,
              updatingToDB: false,
              updateSuccess: true
            });

            self.props.editSpecies(self.state.species);

            self.refreshListMonstersAndSpecies();
          }
          else {
            console.log("Species Fail Update");
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
          <h1 className="display-4">Edit Species : {this.props.aSpecies.name}</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Name"
                         value={this.state.speciesInputName}
                         onChange={(event) => this.setState({speciesInputName: event.target.value})}/>
                </div>

                {this.state.updatingToDB ?
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                  </div>
                  :
                  <div>
                    <button className="btn btn-outline-dark" onClick={() => this.editSpeciesToDB()}>Edit Species</button>
                  </div>
                }

                {this.state.updateSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Species Edited</span></h3>
                    <h6>{this.state.species.name}</h6>
                  </div>
                  : ''
                }
              </div>
            </div>
          </div>
        </div>

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
