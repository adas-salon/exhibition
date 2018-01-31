import React from 'react';

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  handleClick = (device) => (e) => {
    if (device === "desktop") {
      this.store.dispatch({ type: "CHOOSE_DEVICE", mode: device })
    }
    else if (device === "cardboard") {
      this.store.dispatch({ type: "CHOOSE_DEVICE", mode: device })
    }
  }

  render() {
    return (
      <div className="ui inverted segment" style={{ height: '720px', textAlign: 'center'}}>
        <h1>Choose your device:</h1>
        <button onClick={this.handleClick('desktop')} className="ui violet inverted button" role="button">Desktop</button>
        <button onClick={this.handleClick('cardboard')} className="ui purple inverted button" role="button">CardBoard</button>
      </div>
    )
  }

}
