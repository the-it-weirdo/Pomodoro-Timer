import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import Timer from "./src/components/Timer";
import Controls from "./src/components/Controls";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  startStopButtonPress = () => {
    if (this._timer.state.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  resetButtonPress = () => {
    this._timer.resetTimer();
  };

  startTimer = () => {
    this._timer.startTimer();
  };

  stopTimer = () => {
    this._timer.stopTimer();
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.container}>
              <Text style={styles.appHeaderText}>Pomodoro Timer</Text>
              <Timer
                ref={(ref) => {
                  this._timer = ref;
                }}
              />
              <Controls
                onStartPausePress={this.startStopButtonPress}
                onResetPress={this.resetButtonPress}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "#f0f0f0",
  },
  appHeaderText: {
    fontWeight: "bold",
    fontSize: 40,
    margin: 7,
    padding: 5,
  },
});
