import {ImageSourcePropType, StyleSheet} from "react-native";
import {Image} from "expo-image";

type Props = {
  imgSource: ImageSourcePropType;
  topicImage?: string;
};

export default function TopicImage({imgSource, topicImage}: Props) {
  const imageSource = topicImage ? { uri: topicImage } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})