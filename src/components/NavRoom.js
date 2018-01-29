import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import ExhibitionBox from './ExhibitionBox';
import HintText from './HintText';
import TeleportationElement from './TeleportationElement';
import PlayElement from './PlayElement';
import HoverAnimation from './HoverAnimation';
import Name from './Name';

class NavRoom extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  showHintText() {
    return (
      <HintText
        rotation={{ y: 0 }}
        hint={"Click on play"}
        position={{ x: -0.85, y: 1.4, z: -1.5 }}
        wrapCount={16}
      />
    )
  }

  welcomeClicked() {
    if (!this.props.welcomeClicked) {
      this.store.dispatch({ type: "WELCOME_CLICK"})
    }
  }

  renderNavElements() {
    return (
      <Entity>
        <TeleportationElement
          src={ "#milestone-portal" }
          material={{ color: "white"}}
          position={"-0.8 1.753 -1.154"}
          scale={"0.400 0.400 0"}
          transparent={ "true" }
          rotation={"0 20 0"}
          destination="milestoneRoom"
          cursor-listener
          store={ this.store }>
          <HoverAnimation scale={{ x: 0.4, y: 0.4, z: 0 }}/>
        </TeleportationElement>

        <TeleportationElement
          src={ "#activist-portal" }
          material={{ color: "white"}}
          position={"0.8 1.753 -1.2"}
          scale={"0.400 0.400 0"}
          transparent={ "true" }
          rotation={"0 -20 0"}
          destination="activistRoom"
          cursor-listener
          store={ this.store }>
          <HoverAnimation scale={{ x: 0.4, y: 0.4, z: 0 }}/>
        </TeleportationElement>

        <TeleportationElement
          src={ "#space-portal" }
          material={{ color: "white"}}
          position={"-0.8 2.3 -1.2"}
          scale={"0.400 0.400 0"}
          transparent={ "true" }
          rotation={"0 20 0"}
          destination="spaceRoom"
          cursor-listener
          store={ this.store }>
          <HoverAnimation scale={{ x: 0.4, y: 0.4, z: 0 }}/>
        </TeleportationElement>

        <TeleportationElement
          src={ "#rails-portal" }
          material={{ color: "white"}}
          position={"0.8 2.3 -1.2"}
          scale={"0.400 0.400 0"}
          transparent={ "true" }
          rotation={"0 -20 0"}
          destination="newWaysRoom"
          cursor-listener
          store={ this.store }>
          <HoverAnimation scale={{ x: 0.4, y: 0.4, z: 0 }}/>
        </TeleportationElement>
      </Entity>
    )
  }

  render() {
    return (
      <Entity>

        { !this.props.welcomeClicked && this.showHintText() }

        <ExhibitionBox
          src={ "#welcome" }
          position={ "0 2.1 -2"}
          rotation={"0 0 0"}
          scale={"1.3 1.3 0"}
          shader={"flat"}
          transparent={"true"}/>

        <Name position={"0.8 1.3 -2"} name={"Ada Lovelace"}/>

        { this.renderNavElements() }

        <PlayElement
          id="nav-play-element"
          soundID={"#welcome-audio"}
          position= { "-0.5 1.3 -2" }
          cursor-listener
          />

      </Entity>
    )
  }
}

const mapStateToProps = state => {
  return {
    welcomeClicked: state.welcomeClicked
  }
}

const navRoom = connect( mapStateToProps )(NavRoom)

export default navRoom;
