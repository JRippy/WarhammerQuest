import React from 'react';
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
      insertingToDB: false,
      insertSuccess: false,
      monster: null
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
                  <input type="text" className="form-control" id="species" placeholder="Species" value={this.state.monsterInputSpecies} onChange={(event) => this.setState({monsterInputSpecies: event.target.value})}/>
                </div>
                <div className="form-group">
                  <label htmlFor="race">Race:</label>
                  <input type="text" className="form-control" id="race" placeholder="Race" value={this.state.monsterInputRace} onChange={(event) => this.setState({monsterInputRace: event.target.value})}/>
                </div>
                {this.state.insertingToDB ?
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                  </div>
                  :
                  <div>
                    <button className="btn btn-outline-dark" onClick={() => this.addMonsterToDB()}>Add Monster</button>
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

    addMonsterToDB() {
      const self = this;
      self.setState({insertingToDB: true, insertSuccess: false});
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          try {
            const result = yield client.db("WarhammerQuest").collection('Monsters').insertOne({
              "name": self.state.monsterInputName,
              "species": self.state.monsterInputSpecies,
              "race": self.state.monsterInputRace
            });

            console.log(result.ops[0]);
            const monster = result.ops[0];
            self.props.addMonster(monster);

            self.setState({
              insertingToDB: false,
              insertSuccess: true,
              monsterInputName: '',
              monsterInputSpecies: '',
              monsterInputRace: '',
              monster: monster
            });
          } catch (e) {
            console.log(e);
          }
          client.close();
        })
      });
    }
  }
