import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';

import ExhibitionBox from './ExhibitionBox';
import LightSwitch from './LightSwitch';
import HintText from './HintText';
import TeleportationElement from './TeleportationElement';
import PlayElement from './PlayElement';
import HoverAnimation from './HoverAnimation';
import FloorIndicator from './FloorIndicator';
import Lamp from './Lamp';
import Lightbulb from './Lightbulb';
import Name from './Name';

class NewWaysRoom extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  renderEvelyn() {
    return (
      <Entity>
        <Lightbulb position="0 4 -2.8"/>

        <ExhibitionBox
          src={ "#evelynPortrait" }
          position={ "0 2.366 -2.8" }
          rotation={ "0 0 0" }
          scale={ "1.2 1.2 0" }
          >
            <PlayElement
              id="evelyn-play-element"
              soundID={"#evelyn-audio"}
              cursor-listener/>
            <Name name="Evelyn Boyd Granville" />
          </ExhibitionBox >
      </Entity>
    )
  }

  renderHedy() {
    return (
      <Entity>
         <Lightbulb position="-2 4 -2" />

        <ExhibitionBox
          src={ "#hedyPortrait" }
          position={ "-2 2.246 -2" }
          rotation={ "0 50 0" }
          scale={ "1.5 1.5 0" }
          >
            <PlayElement
              id="hedy-play-element"
              soundID={"#hedy-audio"}
              cursor-listener/>
            <Name name="Hedy Lamarr" />
        </ExhibitionBox >
      </Entity>
    )
  }

  renderKamila() {
    return (
      <Entity>
        <Lightbulb position="2 4 -2"/>

        <ExhibitionBox
          src={ "#kamilaPortrait" }
          position={ "2 2.318 -2" }
          rotation={ "0 -50 0" }
          scale={ "1.5 1.5 0" }
        >
          <PlayElement
            id="kamila-play-element"
            soundID={"#kamila-audio"}
            cursor-listener/>
          <Name name="Kamila Sidor" />
      </ExhibitionBox >
      </Entity>
    )
  }

  renderLightSwitchHint() {
    return (
      <HintText
        rotation={{ y: 20 }}
        hint={"Klick auf die Lichtschalter!"}
        position={{ x: -0.5, y: 1.6, z: -1.4 }}
        wrapCount={20}
      />
    )
  }

  isVisible(personVisible) {
    return personVisible ? true : false
  }

  render() {

    const {
      anyLightSwitchClicked,
      evelynVisible,
      hedyVisible,
      kamilaVisible
     } = this.props

    return (
      <Entity>

      { !anyLightSwitchClicked && this.renderLightSwitchHint() }

        <LightSwitch
          position={"0 1.35 -1.4"}
          person={"evelyn"}
          store={ this.store }
          personClicked= { this.isVisible(evelynVisible) }
          cursor-listener />

        <Lamp position="0 4.2 -2.8"/>
        { evelynVisible ? this.renderEvelyn() : <Lightbulb position="0 4 -2.8" off={true}/> }

        <LightSwitch
          position={"-0.5 1.35 -1.4"}
          person={"hedy"}
          store={ this.store }
          personClicked= { this.isVisible(hedyVisible) }
          cursor-listener />

        <Lamp position="-2 4.2 -2"/>
        { hedyVisible ? this.renderHedy() : <Lightbulb position="-2 4 -2" off={true}/> }

        <LightSwitch
          position={"0.5 1.35 -1.4"}
          person={"kamila"}
          store={ this.store }
          personClicked= { this.isVisible(kamilaVisible) }
          cursor-listener />

        <Lamp position="2 4.2 -2"/>
        { kamilaVisible ? this.renderKamila() : <Lightbulb position="2 4 -2" off={true}/> }

        <FloorIndicator src={ "#rails-floor" }/>

        <HintText
          rotation={{ y: 50 }}
          hint={"Exit"}
          position={{ x: -2.8, y: 1, z: 0.6 }}
          wrapCount={8}/>
        <TeleportationElement
          material={{ color: "#01ff26"}}
          position={ "-3.000 0.500 0.634"}
          scale={"0.5 0.5 1"}
          destination="navRoom"
          store={ this.store }
          cursor-listener />
        <HintText
          rotation={{ y: -50 }}
          hint={"Next room"}
          position={{ x: 3, y: 1, z: 0.6 }}
          wrapCount={8}/>
        <TeleportationElement
          material={{ color: "#d800f0"}}
          position={ "3 0.5 0.631"}
          scale={"0.5 0.5 1"}
          destination="milestoneRoom"
          store={ this.store }
          cursor-listener />
      </Entity>
    )
  }
}

const mapStateToProps = state => {
  return {
    evelynVisible: state.evelynVisible,
    hedyVisible: state.hedyVisible,
    kamilaVisible: state.kamilaVisible,
    anyLightSwitchClicked: state.anyLightSwitchClicked
  }
}

const newWaysRoom = connect( mapStateToProps )(NewWaysRoom)

export default newWaysRoom;
