import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

import Content from '../containers/Content';
import Sidebar from '../containers/Sidebar';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      species: [],
      races: [],
      monsters: [],
      editMonster: {},
      editRace: {},
      editSpecies: {},
      deleteMonster: {},
      deleteRace: {},
      deleteSpecies: {}
    }
  }

  componentDidMount() {
    this.loadMonsters();
    this.loadSpecies();
    this.loadRace();
  }

  render() {
    return (
      <div id="main">

        <div id="sidebar">
          <Sidebar
            loadMonsters={() => this.loadMonsters()}
            loadSpecies={() => this.loadSpecies()}
            loadRace={() => this.loadRace()}

            changeTab={(i) => this.setState({activeTab: i})}
          />
        </div>

        <div id="content">
          <Content
            activeTab={this.state.activeTab}
            monsters={this.state.monsters}
            species={this.state.species}
            races={this.state.races}
            addMonster={(monster) => this.addMonster(monster)}
            addRace={(race) => this.addRace(race)}
            addSpecies={(species) => this.addSpecies(species)}
            editMonster={(monster) => this.editMonster(monster)}
            editRace={(race) => this.editRace(race)}
            editSpecies={(species) => this.editSpecies(species)}
            monster={this.state.editMonster}
            race={this.state.editRace}
            aSpecies={this.state.editSpecies}
            deleteMonster={(monster) => this.deleteMonster(monster)}
            deleteRace={(race) => this.deleteRace(race)}
            deleteSpecies={(species) => this.deleteSpecies(species)}
            updateMonsters={(monster) => this.updateMonsters(monster)}
            updateRaces={(race) => this.updateRaces(race)}
          />
        </div>

        <style jsx>{`
          div {
            height: auto;
          }
          #main {
            background-color: #efefef;
            display: flex;
            height: 100%;
          }
          #sidebar {
            width: 250px;
            background-color: #fafafa;
            height: 100%;
          }
          #content {
            flex: 1;
            overflow-y: auto;
          }
        `}</style>
      </div>
    );
  }

    loadMonsters() {
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          // const collection1 = client.db("WarhammerQuest").collection("Species");
          // var docs1 = yield collection1.find({}).toArray();
          // for(let i in docs1) {
          //   docs1[i].value = docs1[i].name;
          //   docs1[i].label = docs1[i].name;
          // }
          // console.log(docs1);
          // self.setState({species: docs1});
          //
          // const collection2 = client.db("WarhammerQuest").collection("Race");
          // const docs2 = yield collection2.find({}).toArray();
          // console.log(docs2);
          // self.setState({race: docs2});

          const collection3 = client.db("WarhammerQuest").collection("Monsters");
          const docs3 = yield collection3.find({}).toArray();
          console.log(docs3);

          //monster.edit = false;

          self.setState({monsters: docs3});

          client.close();
        })
      });
    }

    loadRace() {
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {

          const collection2 = client.db("WarhammerQuest").collection("Race");
          const docs2 = yield collection2.find({}).toArray();
          console.log(docs2);
          self.setState({races: docs2});

          client.close();
        })
      });
    }


    loadSpecies() {
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          const collection1 = client.db("WarhammerQuest").collection("Species");
          var docs1 = yield collection1.find({}).toArray();
          for(let i in docs1) {
            docs1[i].value = docs1[i].name;
            docs1[i].label = docs1[i].name;
            docs1[i].idSpecies = docs1[i]._id.toString();
          }
          console.log(docs1);
          self.setState({species: docs1});

          client.close();
        })
      });
    }

      addMonster(monster) {
        var monsters = this.state.monsters;
        monsters.push(monster);
        this.setState({monsters: monsters});
      }

      addSpecies(s) {
        var species = this.state.species;
        species.push(s);
        this.setState({species: species});
      }

      addRace(r) {
        var races = this.state.races;
        races.push(r);
        this.setState({races: races});
      }

      editMonster(monster) {
        this.setState({activeTab: 6, editMonster: monster});
      }

      editRace(r) {
        this.setState({activeTab: 7, editRace: r});
      }

      editSpecies(s) {
        this.setState({activeTab: 8, editSpecies: s});
      }

      updateMonsters(monsters) {
        this.setState({monsters: monsters});
      }

      updateRaces(r) {
        this.setState({races: r});
      }

      deleteMonster(monster) {
          console.log("Delete Monster");

          const self = this;
          self.setState({deletingToDB: true, deleteSuccess: false, deleteMonster : monster});

          MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
            co(function*() {
              try {
                const result = yield client.db("WarhammerQuest").collection('Monsters').deleteOne({
                  "name": self.state.deleteMonster.name
                });

                const monsterNb = result.deletedCount;

                if (parseInt(monsterNb,10) >= 1) {
                  console.log(monsterNb + " Monster Delete");

                  var monsters = self.state.monsters;
                  monsters = monsters.filter((j) => self.state.deleteMonster !== j);

                  self.setState({
                    deletingToDB: false,
                    deleteSuccess: true,
                    deleteMonster: {},
                    monsters: monsters
                  });

                }
                else {
                  console.log("Monster Fail Delete");
                }

              } catch (e) {
                console.log(e);
              }
              client.close();
            })
          });
        }

      deleteRace(r) {

        const self = this;
        self.setState({deletingToDB: true, deleteSuccess: false, deleteRace : r});

        MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
          co(function*() {
            try {
              const result = yield client.db("WarhammerQuest").collection('Race').deleteOne({
                "name": self.state.deleteRace.name
              });

              const raceNb = result.deletedCount;

              if (parseInt(raceNb,10) >= 1) {
                console.log(raceNb + " Race Delete");

                var races = self.state.races;

                races = races.filter((j) => self.state.deleteRace !== j);

                self.setState({
                  deletingToDB: false,
                  deleteSuccess: true,
                  deleteRace: {},
                  races: races
                });

              }
              else {
                console.log("Race Fail Delete");
              }

            } catch (e) {
              console.log(e);
            }
            client.close();
          })
        });

        //Monster
        var displayList = [];
        var monstersTmp = {};

        this.state.monsters.map((monster, indexM) => {
            if (monster.idRace == r._id.toString()) {

              monstersTmp = {
                _id : monster._id,
                name : monster.name,
                species : '',
                idSpecies : '',
                race : '',
                idRace : ''};

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
                            species : '',
                            idSpecies : '',
                            race : '',
                            idRace : ''},
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

              displayList = displayList.concat(monster);
            }
        });


        this.setState({
          monsters : displayList
        });

      }

      deleteSpecies(species) {

        const self = this;
        self.setState({deletingToDB: true, deleteSuccess: false, deleteSpecies : species});

        MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
          co(function*() {
            try {
              const result = yield client.db("WarhammerQuest").collection('Species').deleteOne({
                "name": self.state.deleteSpecies.name
              });

              const speciesNb = result.deletedCount;

              if (parseInt(speciesNb,10) >= 1) {
                console.log(speciesNb + " Species Delete");

                var species = self.state.species;
                species = species.filter((j) => self.state.deleteSpecies !== j);

                self.setState({
                  deletingToDB: false,
                  deleteSuccess: true,
                  deleteSpecies: {},
                  species: species
                });

              }
              else {
                console.log("Species Fail Delete");
              }

            } catch (e) {
              console.log(e);
            }
            client.close();
          })
        });


        //Race-----------------------------------------------------------------------------------
        var displayListR = [];
        var raceTmp = {};

        this.state.races.map((race, indexM) => {
            if (race.idSpecies == species._id.toString()) {

              raceTmp = {
                _id : race._id,
                name : race.name,
                species : '',
                idSpecies : ''};

              displayListR = displayListR.concat(raceTmp);

              const self = this;
              MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
                co(function*() {
                  try {

                    const result = yield client.db("WarhammerQuest").collection('Race').updateOne(
                      { name: race.name },
                      {
                          $set: {
                            name: race.name,
                            species : '',
                            idSpecies : ''},
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

        //Monster

        var displayList = [];
        var monstersTmp = {};

        this.state.monsters.map((monster, indexM) => {
            if (monster.idSpecies == species._id.toString()) {

              monstersTmp = {
                _id : monster._id,
                name : monster.name,
                species : '',
                idSpecies : '',
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
                            species : '',
                            idSpecies : '',
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

              displayList = displayList.concat(monster);
            }
        });


        this.setState({
          monsters : displayList,
          races : displayListR
        });
      }
}
