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
      speciesInputAtk: '',
      speciesInputDef: '',
      insertingToDB: false,
      insertSuccess: false,
      species: null,
    }
  }

  handleChangeAtk(evt) {
    const speciesInputAtk = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputAtk;
console.log(speciesInputAtk);
    this.setState({ speciesInputAtk });
  }


  handleChangeDef(evt) {
    const speciesInputDef = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputDef;
console.log(speciesInputDef);
console.log(evt.target.validity.valid);
    this.setState({ speciesInputDef });
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
                  <input type="text" pattern="[0-9]*" className="form-control" id="name" placeholder="Name" value={this.state.speciesInputName} onChange={(event) => this.setState({speciesInputName: event.target.value})}/>
                  Atk : <input type="text" pattern="[0-9]*" className="form-control" id="atk" placeholder="Atk" className="stats" onInput={this.handleChangeAtk.bind(this)} value={this.state.speciesInputAtk}/>||
                  Def : <input type="text" pattern="[0-9]*" className="form-control" id="def" placeholder="Def" className="stats" onInput={this.handleChangeDef.bind(this)} value={this.state.speciesInputDef}/>||
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
                    <h8>Atk : {this.state.species.Atk} || Def : {this.state.species.Def}</h8>
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
            .stats {
              width: 30px;
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
                "name": self.state.speciesInputName,
                "Atk": self.state.speciesInputAtk,
                "Def": self.state.speciesInputDef,
              });

              console.log(result.ops[0]);
              const species = result.ops[0];
              species.label = species.name;
              species.value = species.name;
              species.Atk = species.Atk;
              species.Def = species.Def;
              species.idSpecies = species._id.toString();
              self.props.addSpecies(species);

              self.setState({
                insertingToDB: false,
                insertSuccess: true,
                speciesInputName: '',
                speciesInputAtk: '',
                speciesInputDef: '',
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
