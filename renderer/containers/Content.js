import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monsterInputName: '',
      monsterInputSpecies: '',
      monsterInputRace: '',
      insertingToDB: false
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
                      <h6 className="text-muted">Race: {monster.race}</h6>
                      <h6 className="text-muted">Species: {monster.species}</h6>
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
                  <button className="btn btn-outline-dark" onClick={() => this.addMonsterToDB()}>Add Monster</button>
                }
              </div>
            </div>
          </div>
        </div>
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

    addMonsterToDB() {
      // this.setState({insertingToDB: true});
      const self = this;
      MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
        co(function*() {
          const result = yield client.db("WarhammerQuest").collection('Monsters').insertOne({
            "name": self.state.monsterInputName,
            "species": self.state.monsterInputSpecies,
            "race": self.state.monsterInputRace
          });

          client.close();
        })
      });
    }
  }
