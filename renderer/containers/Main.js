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
        const collection = client.db("WarhammerQuest").collection("Monsters");
        const docs = yield collection.find({}).toArray();
        console.log(docs);
        self.setState({monsters: docs});
        client.close();
      })
    });
  }
}
