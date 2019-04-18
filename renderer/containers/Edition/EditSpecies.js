import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class EditMonster extends React.Component {
  constructor(props) {
    super(props);
console.log(this.props);
    this.state = {
      updatingToDB: false,
      updateSuccess: false,
      species: this.props.aSpecies,
      speciesInputName: this.props.aSpecies.name,
      selectedSpecies: false,
      loadingRace: true,
    }
  }
      //
      // onChangeSpecies(selected) {
      //   //console.log("Selected");
      //   this.setState({selectedSpecies: true, loadingRace: true});
      //   const self = this;
      //   MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      //     co(function*() {
      //       const collection1 = client.db("WarhammerQuest").collection("Race");
      //       var docs1 = yield collection1.find({species: selected.name}).toArray();
      //       for(let i in docs1) {
      //         docs1[i].value = docs1[i].name;
      //         docs1[i].label = docs1[i].name;
      //       }
      //       console.log("Docs1");
      //       console.log(docs1);
      //       self.setState({race: docs1, loadingRace: false, monsterInputSpecies: selected.name});
      //
      //       client.close();
      //     })
      //   });
      // }

  editSpeciesToDB() {
    const self = this;
    self.setState({updatingToDB: true, updateSuccess: false});
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        try {

          const result = yield client.db("WarhammerQuest").collection('Species').updateOne(
            { name: self.state.species.name },
            {
                $set: {
                  name: self.state.speciesInputName},
              $currentDate: { lastModified: true }
            }
          );

          const species1 = result.result.ok;

          if (species1 == 1) {
            console.log("Species Updated");

            var speciesEdited = self.state.species;
            speciesEdited.name = self.state.speciesInputName;

            self.setState({
              species: speciesEdited,
              updatingToDB: false,
              updateSuccess: true
            });

            self.props.editSpecies(self.state.species);
          }
          else {
            console.log("Species Fail Update");
          }

        } catch (e) {
          console.log(e);
        }
        client.close();
      })
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-4">Edit Species : {this.props.aSpecies.name}</h1>
          <hr/>
          <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 card addMonsterCard">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Name"
                         value={this.state.speciesInputName}
                         onChange={(event) => this.setState({speciesInputName: event.target.value})}/>
                </div>

                {this.state.updatingToDB ?
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                  </div>
                  :
                  <div>
                    <button className="btn btn-outline-dark" onClick={() => this.editSpeciesToDB()}>Edit Species</button>
                  </div>
                }

                {this.state.updateSuccess ?
                  <div>
                    <h3><span className="badge badge-success">Species Edited</span></h3>
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

}
