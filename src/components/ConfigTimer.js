import React from "react";
import ConfigTimerInput from "./ConfigTimerInput";
import { View } from "react-native";

class ConfigTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ConfigTimerInput data={this.props.workTimerData} />
        <ConfigTimerInput data={this.props.breakTimerData} />
      </View>
    );
  }
}

export default ConfigTimer;
