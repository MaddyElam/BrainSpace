import {Text, View, StyleSheet} from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to BrainSpace, an experimental app that provides you with a visual representation of how much space certain topics and ideas currently take up in your brain.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});