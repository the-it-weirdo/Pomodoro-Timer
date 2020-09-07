import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ConfigTimerInput = (props) => {
  return (
    <View style={style.configInputContainer}>
      <Text>{props.data.type} Time: </Text>
      <TextInput
        style={style.inputField}
        placeholder="Minutes"
        onChangeText={(text) => {
            if (parseInt(text) !== NaN) {
                props.data.onChangeMinute(parseInt(text))
            } else {
                props.data.onChangeMinute(parseInt(0))
            }}}
        defaultValue={""}
        keyboardType="numeric"
      />
      <Text> : </Text>
      <TextInput
        style={style.inputField}
        placeholder="Seconds"
        onChangeText={(text) => {
            if (parseInt(text) !== NaN) {
                props.data.onChangeSecond(parseInt(text))
            } else {
                props.data.onChangeSecond(parseInt(0))
            }}}
        defaultValue={""}
        keyboardType="numeric"
      />
    </View>
  );
};

ConfigTimerInput.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    onChangeMinute: PropTypes.func.isRequired,
    onChangeSecond: PropTypes.func.isRequired,
  }),
};

const style = StyleSheet.create({
  configInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  inputField: {
    borderRadius: 4,
    borderColor: "#000",
  },
});

export default ConfigTimerInput;
