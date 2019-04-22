import React from 'react';
import Select from 'react-select';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class DeleteMonster extends React.Component {
  constructor(props) {
    super(props);

console.log("Page DeleteSpecies");
console.log(this.props);

    this.state = {
      speciestoDelete: '',
      deletingToDB: false,
      deleteSuccess: false,
      species: null,
    }
  }

  componentDidMount(){

    deleteSpeciesToDB();

  }

  // render() {
  //   return (
  //     <div>
  //       <div className="container">
  //         <h1 className="display-4">Delete Species</h1>
  //         <hr/>
  //         <div className="row align-items-center">
  //           <div className="col-md-6 offset-md-3 card addMonsterCard">
  //             <div className="card-body">
  //               <div className="form-group">
  //                 <label htmlFor="name">Name:</label>
  //                 <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.speciesInputName} onChange={(event) => this.setState({speciesInputName: event.target.value})}/>
  //               </div>
  //
  //               {this.state.insertingToDB ?
  //                 <div className="progress">
  //                   <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
  //                 </div>
  //                 :
  //                 <div>
  //                   <button className="btn btn-outline-dark" onClick={() => this.addSpeciesToDB()}>Add Species</button>
  //                 </div>
  //               }
  //
  //               {this.state.deleteSuccess ?
  //                 <div>
  //                   <h3><span className="badge badge-success">Species Added</span></h3>
  //                   <h6>{this.state.species.name}</h6>
  //                 </div>
  //                 : ''
  //               }
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //
  //         <style jsx>{`
  //           div {
  //             height: auto;
  //           }
  //           .progress-bar {
  //             height: 15px;
  //           }
  //           .addMonsterCard {
  //             margin-top: 150px;
  //           }
  //           `}</style>
  //
  //         </div>
  //       );
  //     }
      deleteSpeciesTest() {
          console.log("Test Deleted");
          alert('Delete in progress');
      }

      deleteSpeciesToDB() {
        const self = this;
        self.setState({deletingToDB: true, deleteSuccess: false});
        deleteSpeciesTest();

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
