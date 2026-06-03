import {View, StyleSheet} from "react-native";
import {Link, Stack} from "expo-router";

export default function NotFound() {
  return (
    <>  
        <Stack.Screen options={{title: "Not Found"}} />
        <View style={styles.container}>
          <Link href="/" style={styles.button}>
          Return to home page
          </Link>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 15,
  },
});