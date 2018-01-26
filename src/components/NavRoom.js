import React from 'react';
import aframe from 'aframe';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import ExhibitionBox from './ExhibitionBox';
import HintText from './HintText';
import TeleportationElement from './TeleportationElement';
import PlayElement from './PlayElement';
import HoverAnimation from './HoverAnimation';

class NavRoom extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    const box = document.getElementById('play-element')
    box.setAttribute('sound', 'on', 'click')
    box.setAttribute('sound', 'src', '#welcome-audio')

    aframe.registerComponent('cursor-listener', {
      init: function () {
        const cursor = document.getElementById('cursor')

        this.el.addEventListener('mouseenter', function (evt) {
          cursor.setAttribute('color', '#d800f0')
        })

        this.el.addEventListener('mouseleave', function (evt) {
          cursor.setAttribute('color', 'white')
        })
      }
    })
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

    const playElement = document.getElementById('play-element')

    if (playElement.getAttribute('src') === "#play-icon") {
      playElement.setAttribute('src', '#stop-icon')
      playElement.components.sound.playSound()
    } else {
      playElement.setAttribute('src', '#play-icon')
      playElement.components.sound.stopSound()
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

        { this.props.welcomeClicked && this.renderNavElements() }

        <PlayElement
          id="play-element"
          src={ "#play-icon" }
          position= { "-0.002 1.362 -2.007" }
          events={{ click: () => this.welcomeClicked() }}
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
