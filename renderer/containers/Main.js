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
      editSpecies: {}
    }
  }

  componentDidMount() {
    this.loadMonsters();
    this.loadSpecies();
    this.loadRace();
  }

//   componentWillReceiveProps(props) {
//
//   const { refresh, id } = this.props;
//   //const refresh = this.props.refresh;
//   //const id = this.props.id;
//
//   if (props.refresh !== refresh) {
//     this.loadMonsters();
//     this.loadSpecies();
//     this.loadRace();
//   }
// }

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
          }
          console.log(docs1);
          self.setState({species: docs1});

          client.close();
        })
      });
    }

      addMonster(monster) {
        console.log(1);
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
        console.log(monster);
        this.setState({activeTab: 6, editMonster: monster});
      }

      editRace(r) {
        this.setState({activeTab: 7, editRace: r});
      }

      editSpecies(s) {
        this.setState({activeTab: 8, editSpecies: s});
        //var species = this.state.species;
        //species.push(s);
        //this.setState({editSpecies: s});
      }


      deleteMonster(monster) {
        console.log(monster);
        this.setState({activeTab: 0, deleteMonster: monster});
      }

      deleteRace(r) {
        this.setState({activeTab: 1, deleteRace: r});
      }

      deleteSpecies(s) {
        console.log("Delete Species");
        console.log(this.state);
        console.log(this.state.speciestoDelete);

        const self = this;
        self.setState({deletingToDB: true, deleteSuccess: false});

//         MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
//           co(function*() {
//             try {
//               const result = yield client.db("WarhammerQuest").collection('Species').deleteOne({
//                 "name": self.state.speciestoDelete
//               });
//
//               console.log(result.ops[0]);
//               const species = result.ops[0];
// console.log(result);
//               self.props.deleteSpecies(species);
//
//               self.setState({
//                 deletingToDB: false,
//                 deleteSuccess: true,
//                 speciesInputName: '',
//                 species: species
//               });
//             } catch (e) {
//               console.log(e);
//             }
//             client.close();
//           })
//         });
      }
}
