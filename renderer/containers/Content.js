import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true";

import CreateMonster from '../containers/CreateMonster';
import CreateRace from '../containers/CreateRace';
import CreateSpecies from '../containers/CreateSpecies';
import EditMonster from '../containers/EditMonster';
import EditRace from '../containers/EditRace';
import EditSpecies from '../containers/EditSpecies';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monsterInputName: '',
      monsterInputSpecies: '',
      monsterInputRace: '',
      insertingToDB: false,
      insertSuccess: false,
      monster: null
    }
  }

  render() {
    return (
      <div id="content">
      {this.props.activeTab == 0 ?
        <div className="container">
          <h1 className="display-4">Monsters</h1>
          <hr/>
          {this.props.monsters.length == 0 ?
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                </div>
              </div>
            </div>
            :
            <div className="row">
              {this.props.monsters.map((monster, index) => (
                <div key={index} className="col-md-10 offset-md-1">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">{monster.name}</h4>
                      <h6 className="text-muted">Species: {monster.species}</h6>
                      <h6 className="text-muted">Race: {monster.race}</h6>
                      <button onClick={() => {this.props.editMonster(monster)}}>
                        Edit monster
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        : ''
      }
      {this.props.activeTab == 1 ?
        <div className="container">
          <h1 className="display-4">Races</h1>
          <hr/>
          {this.props.race.length == 0 ?
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                </div>
              </div>
            </div>
            :
            <div className="row">
              {this.props.race.map((race, index) => (
                <div key={index} className="col-md-10 offset-md-1">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="text-title">{race.name}</h4>
                      <h6 className="text-muted">Species: {race.species}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        : ''
      }
      {this.props.activeTab == 2 ?
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        : ''
      }
      {this.props.activeTab == 3 ?
        <CreateMonster
          species={this.props.species}
          race={this.props.race}
          addMonster={(monster) => this.props.addMonster(monster)}
        />
        : ''
      }
      {this.props.activeTab == 4 ?
        <CreateRace
          species={this.props.species}
          addRace={(race) => this.props.addRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 5 ?
        <CreateSpecies
          addSpecies={(species) => this.props.addSpecies(species)}
        />
        : ''
      }

      {this.props.activeTab == 6 ?
        <EditMonster
          monster={this.props.monster}
          species={this.props.species}
          race={this.props.race}
          editMonster={(monster) => this.props.editMonster(monster)}
        />
        : ''
      }
      {this.props.activeTab == 7 ?
        <EditRace
          species={this.props.species}
          editRace={(race) => this.props.editRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 8 ?
        <EditSpecies
          editSpecies={(species) => this.props.editSpecies(species)}
        />
        : ''
      }

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
        .addMonsterCard {
          margin-top: 150px;
        }
        `}</style>
        </div>
      );
    }

    // addMonsterToDB() {
    //   const self = this;
    //   self.setState({insertingToDB: true, insertSuccess: false});
    //   MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
    //     co(function*() {
    //       try {
    //         const result = yield client.db("WarhammerQuest").collection('Monsters').insertOne({
    //           "name": self.state.monsterInputName,
    //           "species": self.state.monsterInputSpecies,
    //           "race": self.state.monsterInputRace
    //         });
    //
    //         console.log(result.ops[0]);
    //         const monster = result.ops[0];
    //         self.props.addMonster(monster);
    //
    //         self.setState({
    //           insertingToDB: false,
    //           insertSuccess: true,
    //           monsterInputName: '',
    //           monsterInputSpecies: '',
    //           monsterInputRace: '',
    //           monster: monster
    //         });
    //       } catch (e) {
    //         console.log(e);
    //       }
    //       client.close();
    //     })
    //   });
    // }
  }
