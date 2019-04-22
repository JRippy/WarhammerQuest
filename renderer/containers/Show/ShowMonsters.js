import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class ShowMonsters extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        monstersData: this.props.monsters,
        monster: null
      }

    }

  componentDidMount() {

    //displayListMonster();

  }

  displayListMonster(){

    var displayList = [];

    console.log(this.props);

    this.props.monsters.map((monster, indexM) => (
      this.props.races.map((race, indexR) => (
          this.props.species.map((species, indexS) => {
            if (race.idSpecies == species._id.toString()) {

              const raceTmp = {name : race.name, species : species.name};
              displayList = displayList.concat(raceTmp);

            }

          }
        )
      ))
    ));


  }

  render() {
    return (
      <div>
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
                      <button className='delete-button'
                              onClick={() => { if (window.confirm('Are you sure you wish to delete this monster?')) this.props.deleteMonster(monster) } }>
                        Delete monster
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

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
          `}</style>
      </div>
      );
    }
  }
