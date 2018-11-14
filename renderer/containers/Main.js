import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      authenticated: false,
      accessToken: null,
      monsters: []
    }
  }

  componentDidMount() {
    this.connenctToServer();
  }

  render() {
    return (
      <div id="main">

        <div id="sidebar">
          <button className="btn btn-outline-dark" onClick={() => this.loadMonsters()}>Load monsters</button>
        </div>

        <div id="content">
          <h1>Warhammer Quest</h1>

          <div className="container-fluid">
            <div className="row">
              {this.state.monsters.map((monster, index) => (
                <div key={index} className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">{monster.name}</h4>
                      <h6 className="text-muted">Race: {monster.race}</h6>
                      <h6 className="text-muted">Species: {monster.species}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            overflow-y: auto;
          }
        `}</style>
      </div>
    );
  }

  connenctToServer() {
    axios.post('https://???????????.herokuapp.com/oauth/token', querystring.stringify({
      // 'form_params': {
      'grant_type': 'password',
      'client_id': 1,
      'client_secret': 'DHDxY2KWlSq41JO8XkTNSieGuIvmztFbZWg8AcvT',
      'username': this.state.username,
      'password': this.state.password,
      'scope': '*',
      // }
    }))
    .then(response => {
      console.log(response);
      // callback({'authenticated': true, 'accessToken': response.data.access_token});
      this.setState({'authenticated': true, 'accessToken': response.data.access_token})
    })
    .catch(error => {
      console.log(error);
    });
  }

  loadMonsters() {
    axios.get('https://whq.herokuapp.com/api/monsters', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
    })
    .then((response) => {
      console.log(response.data.data);
      // callback({tournamentsLoaded: true, tournaments: response.data.data, selected: response.data.data[0].id});
      this.setState({monsters: response.data.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
