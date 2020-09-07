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
import ConfigTimer from "./src/components/ConfigTimer";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.workTimerData = {
      type: "Work",
      onChangeMinute: (newMinute) => {
        console.log(`Work Minute Changed. New Minute: ${newMinute}`);
        this.updateWorkTime(newMinute, this._timer.state.config.work.seconds);
      },
      onChangeSecond: (newSecond) => {
        console.log(`Work Second Changed. New Second: ${newSecond}`);
        this.updateWorkTime(this._timer.state.config.work.minutes, newSecond);
      },
    };

    this.breakTimerData = {
      type: "Break",
      onChangeMinute: (newMinute) => {
        console.log(`Break Minute Changed. New Minute: ${newMinute}`);
        this.updateBreakTime(newMinute, this._timer.state.config.break.seconds);
      },
      onChangeSecond: (newSecond) => {
        console.log(`Break Second Changed. New Second: ${newSecond}`);
        this.updateBreakTime(this._timer.state.config.break.minutes, newSecond);
      },
    };
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

  updateWorkTime(newMinutes, newSeconds) {
    newConfig = {
      type: "Work",
      minutes: newMinutes,
      seconds: newSeconds,
    };
    this._timer.updateWorkTime(newConfig);
  }

  updateBreakTime(newMinutes, newSeconds) {
    newConfig = {
      type: "Break",
      minutes: newMinutes,
      seconds: newSeconds,
    };
    this._timer.updateBreakTime(newConfig);
  }

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
              <ConfigTimer
                workTimerData={this.workTimerData}
                breakTimerData={this.breakTimerData}
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
