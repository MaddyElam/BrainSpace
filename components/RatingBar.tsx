import {Pressable, StyleSheet, View} from 'react-native';
import IconButton from './IconButton';

type Props = {
    onButtonChosen : (newRank : number) => void;
}

export default function RatingBar({onButtonChosen}: Props ){
    const ratingButtons = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ]

    return(
        <View style = {styles.ratingRow}>
            <IconButton icon="arrow-downward" label="Not At All"/>
            {ratingButtons.map((button) => (
                <Pressable
                    key={button.id}
                    style={({ pressed }) => [
                        styles.ratingButton,
                        { backgroundColor: pressed ? '#F0FEFF' : '#84C6D1' }
                    ]}
                    onPress={() => onButtonChosen(button.id)}
                    >
                </Pressable>   
            ))}
            <IconButton icon="arrow-upward" label="All The Time"/>  
        </View>
    );
}

const styles = StyleSheet.create({
    ratingRow: {
        width: 600,
        height: 84,
        borderWidth: 4,
        borderColor: "white",
        borderRadius: 42,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
        gap: 42
    },
    ratingButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 30,
    }
});