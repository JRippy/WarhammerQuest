import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true";

//In progress
import ShowMonsters from '../containers/Show/ShowMonsters';
import ShowRaces from '../containers/Show/ShowRaces';
import ShowSpecies from '../containers/Show/ShowSpecies';

import CreateMonster from '../containers/Creation/CreateMonster';
import CreateRace from '../containers/Creation/CreateRace';
import CreateSpecies from '../containers/Creation/CreateSpecies';
import EditMonster from '../containers/Edition/EditMonster';
import EditRace from '../containers/Edition/EditRace';
import EditSpecies from '../containers/Edition/EditSpecies';

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
          <ShowMonsters
            monsters={this.props.monsters}
            species={this.props.species}
            race={this.props.race}
            addMonster={(monster) => this.props.addMonster(monster)}
            editMonster={(monster) => this.props.editMonster(monster)}
          />
          : ''
      }
      {this.props.activeTab == 1 ?
        <ShowRaces
          monsters={this.props.monsters}
          species={this.props.species}
          race={this.props.race}
          addRaces={(race) => this.props.addRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 2 ?
        <ShowSpecies
          monsters={this.props.monsters}
          species={this.props.species}
          race={this.props.race}
          addSpecies={(specie) => this.props.addSpecies(specie)}
        />
        : ''
      }
      {this.props.activeTab == 3 ?
        <CreateMonster
          species={this.props.species}
          race={this.props.race}
          addMonster={(monster) => this.props.addMonster(monster)}
        />
        : ''
      }
      {this.props.activeTab == 4 ?
        <CreateRace
          species={this.props.species}
          addRace={(race) => this.props.addRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 5 ?
        <CreateSpecies
          addSpecies={(species) => this.props.addSpecies(species)}
        />
        : ''
      }
      {this.props.activeTab == 6 ?
        <EditMonster
          monster={this.props.monster}
          species={this.props.species}
          race={this.props.race}
          editMonster={(monster) => this.props.editMonster(monster)}
        />
        : ''
      }
      {this.props.activeTab == 7 ?
        <EditRace
          species={this.props.species}
          editRace={(race) => this.props.editRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 8 ?
        <EditSpecies
          editSpecies={(species) => this.props.editSpecies(species)}
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
  }
