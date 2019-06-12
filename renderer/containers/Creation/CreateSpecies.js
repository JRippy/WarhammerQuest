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
      speciesInputM: '',
      speciesInputCc: '',
      speciesInputCT: '',
      speciesInputF: '',
      speciesInputE: '',
      speciesInputPV: '',
      speciesInputI: '',
      speciesInputA: '',
      speciesInputCD: '',
      speciesInputINT: '',
      speciesInputCL: '',
      speciesInputFM: '',
      insertingToDB: false,
      insertSuccess: false,
      species: null,
    }
  }

    handleChangeM(evt) {
      const speciesInputM = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputM;
  console.log(speciesInputM);
      this.setState({ speciesInputM });
    }

    handleChangeCc(evt) {
      const speciesInputCc = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputCc;
  console.log(speciesInputCc);
      this.setState({ speciesInputCc });
    }

    handleChangeCT(evt) {
      const speciesInputCT = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputCT;
    console.log(speciesInputCT);
      this.setState({ speciesInputCT });
    }

    handleChangeF(evt) {
      const speciesInputF = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputF;
  console.log(speciesInputF);
      this.setState({ speciesInputF });
    }

    handleChangeE(evt) {
      const speciesInputE = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputE;
  console.log(speciesInputE);
      this.setState({ speciesInputE });
    }

    handleChangePV(evt) {
      const speciesInputPV = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputPV;
  console.log(speciesInputPV);
      this.setState({ speciesInputPV });
    }

    handleChangeI(evt) {
      const speciesInputI = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputI;
  console.log(speciesInputI);
      this.setState({ speciesInputI });
    }

    handleChangeA(evt) {
      const speciesInputA = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputA;
  console.log(speciesInputA);
      this.setState({ speciesInputA });
    }

    handleChangeCD(evt) {
      const speciesInputCD = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputCD;
  console.log(speciesInputCD);
      this.setState({ speciesInputCD });
    }

    handleChangeINT(evt) {
      const speciesInputINT = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputINT;
  console.log(speciesInputINT);
      this.setState({ speciesInputINT });
    }

    handleChangeCL(evt) {
      const speciesInputCL = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputCL;
  console.log(speciesInputCL);
      this.setState({ speciesInputCL });
    }

    handleChangeFM(evt) {
      const speciesInputFM = (evt.target.validity.valid) ? evt.target.value : this.state.speciesInputFM;
  console.log(speciesInputFM);
      this.setState({ speciesInputFM });
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
                  // M : <input type="text" pattern="[0-9]*" className="form-control" id="m" placeholder="M" className="stats" onInput={this.handleChangeM.bind(this)} value={this.state.speciesInputM}/>
                  // Cc : <input type="text" pattern="[0-9]*" className="form-control" id="cc" placeholder="Cc" className="stats" onInput={this.handleChangeCc.bind(this)} value={this.state.speciesInputCc}/>
                  // CT : <input type="text" pattern="[0-9]*" className="form-control" id="ct" placeholder="CT" className="stats" onInput={this.handleChangeCT.bind(this)} value={this.state.speciesInputCT}/>
                  // F : <input type="text" pattern="[0-9]*" className="form-control" id="f" placeholder="F" className="stats" onInput={this.handleChangeF.bind(this)} value={this.state.speciesInputF}/>
                  // E : <input type="text" pattern="[0-9]*" className="form-control" id="e" placeholder="E" className="stats" onInput={this.handleChangeE.bind(this)} value={this.state.speciesInputE}/>
                  // PV : <input type="text" pattern="[0-9]*" className="form-control" id="pv" placeholder="PV" className="stats" onInput={this.handleChangePV.bind(this)} value={this.state.speciesInputPV}/>
                  // I : <input type="text" pattern="[0-9]*" className="form-control" id="i" placeholder="I" className="stats" onInput={this.handleChangeI.bind(this)} value={this.state.speciesInputI}/>
                  // A : <input type="text" pattern="[0-9]*" className="form-control" id="a" placeholder="A" className="stats" onInput={this.handleChangeA.bind(this)} value={this.state.speciesInputA}/>
                  // CD : <input type="text" pattern="[0-9]*" className="form-control" id="cd" placeholder="CD" className="stats" onInput={this.handleChangeCD.bind(this)} value={this.state.speciesInputCD}/>
                  // INT : <input type="text" pattern="[0-9]*" className="form-control" id="int" placeholder="INT" className="stats" onInput={this.handleChangeINT.bind(this)} value={this.state.speciesInputINT}/>
                  // CL : <input type="text" pattern="[0-9]*" className="form-control" id="cl" placeholder="CL" className="stats" onInput={this.handleChangeCL.bind(this)} value={this.state.speciesInputCL}/>
                  // FM : <input type="text" pattern="[0-9]*" className="form-control" id="fm" placeholder="FM" className="stats" onInput={this.handleChangeFM.bind(this)} value={this.state.speciesInputFM}/>
                  M : <input type="number" pattern="[0-9]*" className="form-control" id="m" placeholder="M" className="stats" onInput={this.handleChangeM.bind(this)} value={this.state.speciesInputM}/>
                  Cc : <input type="number" pattern="[0-9]*" className="form-control" id="cc" placeholder="Cc" className="stats" onInput={this.handleChangeCc.bind(this)} value={this.state.speciesInputCc}/>
                  CT : <input type="number" pattern="[0-9]*" className="form-control" id="ct" placeholder="CT" className="stats" onInput={this.handleChangeCT.bind(this)} value={this.state.speciesInputCT}/>
                  F : <input type="number" pattern="[0-9]*" className="form-control" id="f" placeholder="F" className="stats" onInput={this.handleChangeF.bind(this)} value={this.state.speciesInputF}/>
                  E : <input type="number" pattern="[0-9]*" className="form-control" id="e" placeholder="E" className="stats" onInput={this.handleChangeE.bind(this)} value={this.state.speciesInputE}/>
                  PV : <input type="number" pattern="[0-9]*" className="form-control" id="pv" placeholder="PV" className="stats" onInput={this.handleChangePV.bind(this)} value={this.state.speciesInputPV}/>
                  I : <input type="number" pattern="[0-9]*" className="form-control" id="i" placeholder="I" className="stats" onInput={this.handleChangeI.bind(this)} value={this.state.speciesInputI}/>
                  A : <input type="number" pattern="[0-9]*" className="form-control" id="a" placeholder="A" className="stats" onInput={this.handleChangeA.bind(this)} value={this.state.speciesInputA}/>
                  CD : <input type="number" pattern="[0-9]*" className="form-control" id="cd" placeholder="CD" className="stats" onInput={this.handleChangeCD.bind(this)} value={this.state.speciesInputCD}/>
                  INT : <input type="number" pattern="[0-9]*" className="form-control" id="int" placeholder="INT" className="stats" onInput={this.handleChangeINT.bind(this)} value={this.state.speciesInputINT}/>
                  CL : <input type="number" pattern="[0-9]*" className="form-control" id="cl" placeholder="CL" className="stats" onInput={this.handleChangeCL.bind(this)} value={this.state.speciesInputCL}/>
                  FM : <input type="number" pattern="[0-9]*" className="form-control" id="fm" placeholder="FM" className="stats" onInput={this.handleChangeFM.bind(this)} value={this.state.speciesInputFM}/>
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
                    <h6>M : {this.state.species.M} ||
                        Cc : {this.state.species.Cc} ||
                        CT : {this.state.species.CT} ||
                        F : {this.state.species.F} ||
                        E : {this.state.species.E} ||
                        PV : {this.state.species.PV} ||
                        I : {this.state.species.I} ||
                        A : {this.state.species.A} ||
                        CD : {this.state.species.CD} ||
                        INT : {this.state.species.INT} ||
                        CL : {this.state.species.CL} ||
                        FM : {this.state.species.FM}
                        </h6>
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
                "M": self.state.speciesInputM,
                "Cc": self.state.speciesInputCc,
                "CT": self.state.speciesInputCT,
                "F": self.state.speciesInputF,
                "E": self.state.speciesInputE,
                "PV": self.state.speciesInputPV,
                "I": self.state.speciesInputI,
                "A": self.state.speciesInputA,
                "CD": self.state.speciesInputCD,
                "INT": self.state.speciesInputINT,
                "CL": self.state.speciesInputCL,
                "FM": self.state.speciesInputFM
              });

              console.log(result.ops[0]);
              const species = result.ops[0];
              species.label = species.name;
              species.value = species.name;
              species.M= species.M
              species.Cc= species.Cc
              species.CT= species.CT
              species.F= species.F
              species.E= species.E
              species.PV= species.PV
              species.I= species.I
              species.A= species.A
              species.CD= species.CD
              species.INT= species.INT
              species.CL= species.CL
              species.FM= species.FM
              species.idSpecies = species._id.toString();
              self.props.addSpecies(species);

              self.setState({
                insertingToDB: false,
                insertSuccess: true,
                speciesInputName: '',
                speciesInputM:'',
                speciesInputCc:'',
                speciesInputCT:'',
                speciesInputF:'',
                speciesInputE:'',
                speciesInputPV:'',
                speciesInputI:'',
                speciesInputA:'',
                speciesInputCD:'',
                speciesInputINT:'',
                speciesInputCL:'',
                speciesInputFM:'',
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
