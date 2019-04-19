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

import DeleteMonster from '../containers/Delete/DeleteMonster';
import DeleteRace from '../containers/Delete/DeleteRace';
import DeleteSpecies from '../containers/Delete/DeleteSpecies';

export default class Content extends React.Component {
  constructor(props) {
    super(props);


    console.log(this.state);
    console.log(this.props);

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
          />
          : ''
      }
      {this.props.activeTab == 1 ?
        <ShowRaces
          //monsters={this.props.monsters}
          species={this.props.species}
          races={this.props.races}
          editRace={(race) => this.props.editRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 2 ?
        <ShowSpecies
          // monsters={this.props.monsters}
          species={this.props.species}
          races={this.props.races}
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
          race={this.props.race}
          races={this.props.races}
          species={this.props.species}
          editRace={(race) => this.props.editRace(race)}
        />
        : ''
      }
      {this.props.activeTab == 8 ?
        <EditSpecies
          aSpecies={this.props.aSpecies}
          editSpecies={(aSpecies) => this.props.editSpecies(aSpecies)}
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
