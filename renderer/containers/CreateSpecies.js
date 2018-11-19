import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class CreateMonster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speciesInputName: '',
      insertingToDB: false,
      insertSuccess: false,
      species: null,
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Add Species</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.speciesInputName} onChange={(event) => this.setState({speciesInputName: event.target.value})}/>
                </div>

                {this.state.insertingToDB ?
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                  </div>
                  :
                  <div>
                    <button className="btn btn-outline-dark" onClick={() => this.addSpeciesToDB()}>Add Species</button>
                  </div>
                }

                {this.state.insertSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Species Added</span></h3>
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

      addSpeciesToDB() {
        const self = this;
        self.setState({insertingToDB: true, insertSuccess: false});
        MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
          co(function*() {
            try {
              const result = yield client.db("WarhammerQuest").collection('Species').insertOne({
                "name": self.state.speciesInputName
              });

              console.log(result.ops[0]);
              const species = result.ops[0];
              species.label = species.name;
              species.value = species.name;
              self.props.addSpecies(species);

              self.setState({
                insertingToDB: false,
                insertSuccess: true,
                speciesInputName: '',
                species: species
              });
            } catch (e) {
              console.log(e);
            }
            client.close();
          })
        });
      }
    }
