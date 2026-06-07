import {ImageSourcePropType, StyleSheet} from "react-native";
import {Image} from "expo-image";

type Props = {
  imgSource: ImageSourcePropType;
  topicImage?: string;
};

export default function TopicImage({imgSource, topicImage}: Props) {
  const imageSource = topicImage ? { uri: topicImage } : imgSource;
  return <Image source={imageSource} style={styles.image} contentFit="contain"/>;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
})