import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class CreateMonster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monsterInputName: '',
      monsterInputSpecies: '',
      monsterInputRace: '',
      monsterInputIDSpecies: '',
      monsterInputIDRace: '',
      insertingToDB: false,
      insertSuccess: false,
      monster: null,
      race: [],
      selectedSpecies: false,
      selectedRace: false,
      loadingRace: true
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Add Monster</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.monsterInputName} onChange={(event) => this.setState({monsterInputName: event.target.value})}/>
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
                            onChange={(selected) => this.onChangeRace(selected)}
                          />
                        </div>
                        {this.state.insertingToDB ?
                          <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                          </div>
                          :
                          <div>
                            {this.state.selectedRace ?
                              <button className="btn btn-outline-dark" onClick={() => this.addMonsterToDB()}>Add Monster</button>
                              : ''
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                  : ''
                }
                {this.state.insertSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Monster Added</span></h3>
                    <h6>{this.state.monster.name}</h6>
                    <h6 className="text-muted">Species: {this.state.monster.species}</h6>
                    <h6 className="text-muted">Race: {this.state.monster.race}</h6>
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
      this.setState({selectedSpecies: true, loadingRace: true});
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          const collection1 = client.db("WarhammerQuest").collection("Race");
          var docs1 = yield collection1.find({species: selected.name}).toArray();
          for(let i in docs1) {
            docs1[i].value = docs1[i].name;
            docs1[i].label = docs1[i].name;
            docs1[i].idRace = docs1[i]._id.toString();
          }

          console.log(docs1);
          self.setState({race: docs1, loadingRace: false, monsterInputSpecies: selected.name, monsterInputIDSpecies: selected._id.toString()});

          client.close();
        })
      });
    }

    onChangeRace(selected) {
      this.setState({selectedRace: true, monsterInputRace: selected.name, monsterInputIDRace: selected.idRace});
    }

    addMonsterToDB() {
      const self = this;
      self.setState({insertingToDB: true, insertSuccess: false});

      // this.state.race.map((race, index) => {
      //   if (this.state.monsterInputRace == race.name)
      //     self.setState({monsterInputIDRace: race._id.toString()});
      //   }
      // )
      //
      // this.props.species.map((species, index) => {
      //   if (this.state.raceInputSpecies == species.name)
      //     self.setState({monsterInputIDSpecies: species._id.toString()});
      //   }
      // )

      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          try {
            const result = yield client.db("WarhammerQuest").collection('Monsters').insertOne({
              "name": self.state.monsterInputName,
              "species": self.state.monsterInputSpecies,
              "race": self.state.monsterInputRace,
              "idSpecies": self.state.monsterInputIDSpecies,
              "idRace": self.state.monsterInputIDRace
            });

            console.log(result.ops[0]);
            const monster = result.ops[0];
            monster.idMonster = monster._id.toString();
            self.props.addMonster(monster);

            self.setState({
              insertingToDB: false,
              insertSuccess: true,
              monsterInputName: '',
              monsterInputSpecies: '',
              monsterInputRace: '',
              monsterInputIDSpecies: '',
              monsterInputIDRace: '',
              monster: monster,
              selectedSpecies: false,
              selectedRace: false
            });
          } catch (e) {
            console.log(e);
          }
          client.close();
        })
      });
    }
  }
