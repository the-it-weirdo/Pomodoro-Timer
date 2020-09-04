import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ClockView from "./ClockView";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: {
        type: "Work",
        minutes: 25,
        seconds: 0,
      },
      config: {
        work: {
          type: "Work",
          minutes: 25,
          seconds: 0,
        },
        break: {
          type: "Break",
          minutes: 25,
          seconds: 0,
        },
      },
    };

    this.countdown = this.countdown.bind(this);
  }

  async countdown() {
    while (this.state.current.minutes > -1) {
      while (this.state.current.seconds !== 60) {
        await sleep(1000).then(() => {
          const currentSecond = this.state.current.seconds + 1;
          this.setState({
            current: {
              type: this.state.current.type,
              minutes: this.state.current.minutes,
              seconds: currentSecond,
            },
          });
        });
      }
      this.setState({
        current: {
          type: this.state.current.type,
          minutes: this.state.current.minutes - 1,
          seconds: 0,
        },
      });
    }
    this.setState({
      current: this.state.current.type === "Work"? this.state.config.break:this.state.config.work,
    });
  }

  render() {
    // this.countdown(); Not working. Elaborate reading required.
    return <ClockView time={this.state.current} />;
  }
}
