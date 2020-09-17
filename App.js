import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import CountdownTimer from "./src/components/CountdownTimer";
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

    this.state = {
      currentTimerIdx: 0,
      timers: [
        { minutes: 0, seconds: 10, type: "work" },
        { minutes: 0, seconds: 5, type: "break" },
      ],
    };
  }

  onCountdownComplete = () => {
    this.setState(
      (previousState) => ({
        currentTimerIdx: previousState.currentTimerIdx + 1,
      }),
      () => {
        this._timer.updateTimer(
          this.state.timers[
            this.state.currentTimerIdx % this.state.timers.length
          ]
        );
      }
    );
  };

  startStopButtonPress = () => {
    if (this._timer.state.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  resetButtonPress = () => {
    this.stopTimer();
    this._timer.updateTimer(this.state.timers[0]);
  };

  startTimer = () => {
    this._timer.startCountdown();
  };

  stopTimer = () => {
    this._timer.stopCountdown();
  };

  // updateWorkTime(newMinutes, newSeconds) {
  //   newConfig = {
  //     type: "Work",
  //     minutes: newMinutes,
  //     seconds: newSeconds,
  //   };
  //   this._timer.updateWorkTime(newConfig);
  // }

  // updateBreakTime(newMinutes, newSeconds) {
  //   newConfig = {
  //     type: "Break",
  //     minutes: newMinutes,
  //     seconds: newSeconds,
  //   };
  //   this._timer.updateBreakTime(newConfig);
  // }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.container}>
              <Text style={styles.appHeaderText}>Pomodoro Timer</Text>
              <CountdownTimer
                time={this.state.timers[this.state.currentTimerIdx]}
                onCountdownComplete={this.onCountdownComplete}
                ref={(ref) => {
                  this._timer = ref;
                }}
              />
              <Controls
                onStartPausePress={this.startStopButtonPress}
                onResetPress={this.resetButtonPress}
              />
              {/*<ConfigTimer
                workTimerData={this.workTimerData}
                breakTimerData={this.breakTimerData}
              />*/}
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
