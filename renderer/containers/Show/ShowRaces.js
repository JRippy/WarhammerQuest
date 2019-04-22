import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class ShowRaces extends React.Component {

    constructor(props) {
      super(props);

console.log(this.props);

      this.state = {
        monsterInputSpecies: '',
        monsterInputRace: '',
        racesData: this.props.races,
        race: null,
        racesDisplay: []
      }

    }

componentDidMount(){

      this.setState({
        racesDisplay: this.displayListRace()
      });

}

  componentWillReceiveProps(nextProps) {

    console.log("ComponentReceive");
    console.log(this.props);
    console.log(nextProps);

    const { refresh, id } = this.props;
    if (nextProps.refresh !== refresh) {
      this.displayListRace();
    }

  }

//TODO finish
  displayListRace(){

    var displayList = this.state.racesDisplay;
    var raceTmp = {};

    this.props.races.map((race, indexR) => (
        this.props.species.map((species, indexS) => {
          if (race.idSpecies == species._id.toString()) {

            raceTmp = {name : race.name, species : species.name, idSpecies : species._id.toString()};
            displayList = displayList.concat(raceTmp);

          }

        }
      )
    ));

    this.setState({
      monsterInputSpecies: 'Coucou',
      monsterInputRace: 'Coucou',
      racesDisplay : displayList
    });

    // this.setState({
    //   racesDisplay : [this.state.racesDisplay, displayList]
    // });

    // this.setState({
    //   racesDisplay : this.state.racesDisplay.concat(displayList)
    // });

    console.log(displayList);
    console.log(this.state);
    return displayList;
  }

  render() {

    return (
      <div>
        <div className="container">
          <h1 className="display-4">Races</h1>
          <hr/>
          {this.props.races.length == 0 ?
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                </div>
              </div>
            </div>
            :
            <div className="row">
              {this.props.races.map((race, index) => (
                <div key={index} className="col-md-10 offset-md-1">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="text-title">{race.name}</h4>
                      <h6 className="text-muted">Species: {race.species}</h6>
                      <button onClick={() => {this.props.editRace(race)}}>
                        Edit race
                      </button>
                      <button className='delete-button'
                              onClick={() => { if (window.confirm('Are you sure you wish to delete this race?')) this.props.deleteRace(race) } }>
                        Delete race
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
