import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true";

import CreateMonster from '../containers/CreateMonster';

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
        <CreateMonster
          addMonster={(monster) => this.props.addMonster(monster)}
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
