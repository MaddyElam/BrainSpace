import {View, StyleSheet} from "react-native";
import {useState} from "react";

import TopicImage from "@/components/TopicImage";

const DefaultTopicImage = require('@/assets/images/background-image.png');

export default function TopicSelection() {
    const [topicImage, setTopicImage] = useState<string | undefined>(undefined);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TopicImage imgSource={DefaultTopicImage} topicImage={topicImage} />
            </View>
            <View style={styles.buttonsContainer}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#183057',
    },
    imageContainer: {
        flex: 1,
    },
    buttonsContainer: {
        flex: 1 / 3,
        alignItems: 'center'
    },
});