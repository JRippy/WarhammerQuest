import React from 'react';
import co from 'co';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class ShowRaces extends React.Component {

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

//To put on Main/Content
  componentDidMount() {
    this.loadMonsters();
    this.loadSpecies();
    this.loadRace();
  }


  loadMonsters() {
    const self = this;
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        // const collection1 = client.db("WarhammerQuest").collection("Species");
        // var docs1 = yield collection1.find({}).toArray();
        // for(let i in docs1) {
        //   docs1[i].value = docs1[i].name;
        //   docs1[i].label = docs1[i].name;
        // }
        // console.log(docs1);
        // self.setState({species: docs1});
        //
        // const collection2 = client.db("WarhammerQuest").collection("Race");
        // const docs2 = yield collection2.find({}).toArray();
        // console.log(docs2);
        // self.setState({race: docs2});

        const collection3 = client.db("WarhammerQuest").collection("Monsters");
        const docs3 = yield collection3.find({}).toArray();
        console.log(docs3);

        //monster.edit = false;

        self.setState({monsters: docs3});

        client.close();
      })
    });
  }

  loadRace() {
    const self = this;
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {

        const collection2 = client.db("WarhammerQuest").collection("Race");
        const docs2 = yield collection2.find({}).toArray();
        console.log(docs2);
        self.setState({race: docs2});

        client.close();
      })
    });
  }


  loadSpecies() {
    const self = this;
    MongoClient.connect(URI, { useNewUrlParser: true }, function(err, client) {
      co(function*() {
        const collection1 = client.db("WarhammerQuest").collection("Species");
        var docs1 = yield collection1.find({}).toArray();
        for(let i in docs1) {
          docs1[i].value = docs1[i].name;
          docs1[i].label = docs1[i].name;
        }
        console.log(docs1);
        self.setState({species: docs1});

        client.close();
      })
    });
  }

  render() {
    return (
      <div>
      <div className="container">
        <h1 className="display-4">Species</h1>
        <hr/>
        {this.props.species.length == 0 ?
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
          :
          <div className="row">
            {this.props.species.map((specie, index) => (
              <div key={index} className="col-md-10 offset-md-1">
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-title">{specie.name}</h4>
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
