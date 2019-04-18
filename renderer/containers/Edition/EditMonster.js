import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class EditMonster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingToDB: false,
      updateSuccess: false,
      monster: this.props.monster,
      race: [],
      monsterInputName: this.props.monster.name,
      monsterInputSpecies: this.props.monster.species,
      monsterInputRace: this.props.monster.race,
      selectedSpecies: false,
      selectedRace: false,
      loadingRace: true
    }
  }

    onChangeSpecies(selected) {
      //console.log("Selected");
      this.setState({selectedSpecies: true, loadingRace: true});
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          const collection1 = client.db("WarhammerQuest").collection("Race");
          var docs1 = yield collection1.find({species: selected.name}).toArray();
          for(let i in docs1) {
            docs1[i].value = docs1[i].name;
            docs1[i].label = docs1[i].name;
          }

          self.setState({race: docs1, loadingRace: false, monsterInputSpecies: selected.name});

          client.close();
        })
      });
    }

    onChangeRace(selected) {
      this.setState({selectedRace: true, monsterInputRace: selected.name});
    }

    editMonsterToDB() {

      const self = this;
      self.setState({updatingToDB: true, updateSuccess: false});
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          try {

            const result = yield client.db("WarhammerQuest").collection('Monsters').updateOne(
              { name: self.state.monster.name },
              {
                  $set: {
                    name: self.state.monsterInputName,
                    species: self.state.monsterInputSpecies,
                    race:  self.state.monsterInputRace},
                $currentDate: { lastModified: true }
              }
          );

            const monster1 = result.result.ok;
            const monsterNameEdited = self.state.monsterInputName;
            const monsterSpeciesEdited = self.state.monsterInputSpecies;
            const monsterRaceEdited = self.state.monsterInputRace;

            if (monster1 == 1) {
              console.log("Monster Updated");

              var monsterEdited = self.state.monster;
              monsterEdited.name = monsterNameEdited;
              monsterEdited.species = monsterSpeciesEdited;
              monsterEdited.race = monsterRaceEdited;

              self.setState({
                updatingToDB: false,
                updateSuccess: true,
                monsterInputName: monsterNameEdited,
                monsterInputSpecies: monsterSpeciesEdited,
                monsterInputRace: monsterRaceEdited,
                monster: monsterEdited,

                selectedSpecies: false,
                selectedRace: false
              });

              self.props.editMonster(self.state.monster);

            }
            else {
              console.log("Monster Fail Update");
            }


          } catch (e) {
            console.log(e);
          }
          client.close();
        })
      });
    }

      //Editer page monster
      render() {
        return (
          <div>
            <div className="container">
              <h1 className="display-4">Edit Monster : {this.props.monster.name}</h1>
              <hr/>
              <div className="row align-items-center">
                <div className="col-md-6 offset-md-3 card editMonsterCard">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input type="text" className="form-control" id="name" placeholder="Name"
                            value={this.state.monsterInputName}
                            onChange={(event) => this.setState({monsterInputName: event.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="species">Species:</label>
                      {/* <input type="text" className="form-control" id="species" placeholder="Species" value={this.state.monsterInputSpecies} onChange={(event) => this.setState({monsterInputSpecies: event.target.value})}/> */}
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isLoading={false}
                        isClearable={false}
                        isSearchable={true}
                        name="color"
                        defaultValue={{ label: this.props.monster.species, value: 0 }}
                        options={this.props.species}
                        onChange={(selected) => this.onChangeSpecies(selected)}
                      />
                    </div>
                    {this.state.selectedSpecies ?
                      <div>
                        {this.state.loadingRace ?
                          <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                          </div>
                          :
                          <div>
                            <div className="form-group">
                              <label htmlFor="race">Race:</label>
                              {/* <input type="text" className="form-control" id="race" placeholder="Race" value={this.state.monsterInputRace} onChange={(event) => this.setState({monsterInputRace: event.target.value})}/> */}
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                isClearable={false}
                                isSearchable={true}
                                name="color"
                                options={this.state.race}
                                defaultValue={{ label: this.props.monster.race, value: 0 }}
                                onChange={(selected) => this.onChangeRace(selected)}
                              />
                            </div>
                            {this.state.updatingToDB ?
                              <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                              </div>
                              :
                              <div>
                                {this.state.selectedRace ?
                                  <button className="btn btn-outline-dark" onClick={() => this.editMonsterToDB()}>Edit Monster</button>
                                  : ''
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                      : ''
                    }
                    {this.state.updateSuccess ?
                      <div>
                        <h3><span className="badge badge-success">Monster Edited</span></h3>
                        <h6>Name : {this.state.monsterInputName}</h6>
                        <h6 className="text-muted">Species: {this.state.monsterInputSpecies}</h6>
                        <h6 className="text-muted">Race: {this.state.monsterInputRace}</h6>
                        <h6>{console.log(this.state)}</h6>
                        <h6>{console.log(this.props)}</h6>
                      </div>
                      :''
                      // <div>
                      //   <h3><span className="badge badge-danger">Monster not Edited</span></h3>
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
            .editMonsterCard {
              margin-top: 150px;
            }
            `}</style>

            </div>
          );
        }
  }
