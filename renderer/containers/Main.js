import React from 'react';
import axios from 'axios';
import querystring from 'querystring';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

import Content from '../containers/Content';
import Sidebar from '../containers/Sidebar';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      species: [],
      race: [],
      monsters: []
    }
  }

  componentDidMount() {
    this.loadMonsters();
  }

  render() {
    return (
      <div id="main">

        <div id="sidebar">
          <Sidebar
            loadMonsters={() => this.loadMonsters()}
            changeTab={(i) => this.setState({activeTab: i})}
          />
        </div>

        <div id="content">
          <Content
            activeTab={this.state.activeTab}
            monsters={this.state.monsters}
            addMonster={(monster) => this.addMonster(monster)}
          />
        </div>

        <style jsx>{`
          div {
            height: auto;
          }
          #main {
            background-color: #efefef;
            display: flex;
            height: 100%;
          }
          #sidebar {
            width: 250px;
            background-color: #fafafa;
            height: 100%;
          }
          #content {
            flex: 1;
            overflow-y: auto;
          }
        `}</style>
      </div>
    );
  }

  loadMonsters() {
    const self = this;
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        const collection1 = client.db("WarhammerQuest").collection("Species");
        const docs1 = yield collection1.find({}).toArray();
        console.log(docs1);
        self.setState({monsters: docs1});

        const collection2 = client.db("WarhammerQuest").collection("Race");
        const docs2 = yield collection2.find({}).toArray();
        console.log(docs2);
        self.setState({monsters: docs2});

        const collection3 = client.db("WarhammerQuest").collection("Monsters");
        const docs3 = yield collection3.find({}).toArray();
        console.log(docs3);
        self.setState({monsters: docs3});

        client.close();
      })
    });
  }

  addMonster(monster) {
    var monsters = this.state.monsters;
    monsters.push(monster);
    this.setState({monsters: monsters});
  }
}
