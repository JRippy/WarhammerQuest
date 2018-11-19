import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div id="sidebar">
        <div className="menuItem" onClick={() => this.props.changeTab(0)}>Monsters</div>
        <div className="menuItem" onClick={() => this.props.changeTab(1)}>Add Monster</div>
        <div className="menuItem" onClick={() => this.props.changeTab(2)}>Add Species</div>
        <div className="menuItem" onClick={() => this.props.changeTab(3)}>Add Race</div>
        {/* <button className="btn btn-outline-dark" onClick={() => this.props.loadMonsters()}>Load monsters</button> */}

        <style jsx>{`
          div {
            height: auto;
          }
          .menuItem {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s;
          }
          .menuItem:hover {
            background: #eee;
          }
        `}</style>
      </div>
    );
  }
}
