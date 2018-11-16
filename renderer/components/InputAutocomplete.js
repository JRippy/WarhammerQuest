import React from 'react';
import co from 'co';

import 'jquery';
import 'jquery.caret';
import 'at.js';

const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://warhammerquestClient:awesomepassword@warhammerquest-qkwxp.mongodb.net/test?retryWrites=true"

export default class InputAutocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.linkAt();
  }

  render() {
    return (
      <div className="inputAutocomplete">
        <div className="input-group">
          <label>{this.props.type}</label>
          <div contentEditable="true" className="form-control" id={"autocomplete" + this.props.type}></div>
          <input type="text" name="value" id="value"/>
        </div>

      <style jsx>{`

        `}</style>
        </div>
      );
    }

    linkAt() {
      
    }
  }
