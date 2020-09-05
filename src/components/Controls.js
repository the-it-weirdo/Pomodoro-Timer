import React from "react";
import { StyleSheet, Button, View } from "react-native";

export default class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
    };

    this.toggleStartPause = this.toggleStartPause.bind(this);
    this.resetPressed = this.resetPressed.bind(this);
  }

  toggleStartPause() {
    this.setState({ started: !this.state.started });
    this.props.onStartPausePress();
  }

  resetPressed() {
    this.setState({ started: false });
    this.props.onResetPress();
  }

  render() {
    const startPauseText = this.state.started ? "Pause" : "Start";
    return (
      <View style={style.controlContainer}>
        <Button
          style={style.button}
          onPress={this.toggleStartPause}
          title={startPauseText}
        />
        <Button
          style={style.button}
          onPress={this.resetPressed}
          title="Reset"
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  controlContainer: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    padding: 5,
  },
  button: {
    margin: 5,
    padding: 5,
  },
});
