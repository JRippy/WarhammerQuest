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
//
// import DeleteMonster from '../containers/Delete/DeleteMonster';
// import DeleteRace from '../containers/Delete/DeleteRace';
// import DeleteSpecies from '../containers/Delete/DeleteSpecies';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monsterInputName: '',
      monsterInputSpecies: '',
      monsterInputRace: '',
      insertingToDB: false,
      insertSuccess: false,
      monster: null,
      race: null,
      aSpecies: null
    }
  }

  render() {
    return (
      <div id="content">
      {this.props.activeTab == 0 ?
          <ShowMonsters
            monsters={this.props.monsters}
            species={this.props.species}
            races={this.props.races}
            editMonster={(monster) => this.props.editMonster(monster)}
            deleteMonster={(monster) => this.props.deleteMonster(monster)}
          />
          : ''
      }
      {this.props.activeTab == 1 ?
        <ShowRaces
          monsters={this.props.monsters}
          species={this.props.species}
          races={this.props.races}
          updateMonsters={(monster) => this.props.updateMonsters(monster)}
          editRace={(race) => this.props.editRace(race)}
          deleteRace={(race) => this.props.deleteRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 2 ?
        <ShowSpecies
          monsters={this.props.monsters}
          races={this.props.races}
          species={this.props.species}
          aSpecies={this.props.aSpecies}
          updateMonsters={(monster) => this.props.updateMonsters(monster)}
          updateRaces={(race) => this.props.updateRaces(race)}
          editSpecies={(aSpecies) => this.props.editSpecies(aSpecies)}
          deleteSpecies={(aSpecies) => this.props.deleteSpecies(aSpecies)}
        />
        : ''
      }
      {this.props.activeTab == 3 ?
        <CreateMonster
          species={this.props.species}
          races={this.props.races}
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
          races={this.props.races}
          species={this.props.species}
          editMonster={(monster) => this.props.editMonster(monster)}
        />
        : ''
      }
      {this.props.activeTab == 7 ?
        <EditRace
          monsters={this.props.monsters}
          race={this.props.race}
          races={this.props.races}
          species={this.props.species}
          editMonster={(monster) => this.props.editMonster(monster)}
          editRace={(race) => this.props.editRace(race)}
          updateMonsters={(monster) => this.props.updateMonsters(monster)}
        />
        : ''
      }
      {this.props.activeTab == 8 ?
        <EditSpecies
          aSpecies={this.props.aSpecies}
          monsters={this.props.monsters}
          races={this.props.races}
          editMonster={(monster) => this.props.editMonster(monster)}
          editRace={(race) => this.props.editRace(race)}
          editSpecies={(aSpecies) => this.props.editSpecies(aSpecies)}
          updateMonsters={(monster) => this.props.updateMonsters(monster)}
          updateRaces={(race) => this.props.updateRaces(race)}
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
