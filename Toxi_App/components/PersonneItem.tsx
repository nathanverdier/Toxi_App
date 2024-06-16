import { View, Image, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Personne } from "@/model/Personne";

interface PersonneItemProps {
    personne : Personne
}

export function PersonneItem({personne} : PersonneItemProps) {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Image source={{uri: 'data:image/jpeg;base64,'+ personne.getImage()}} style={styles.image} />
            <Text style={styles.name}>{personne.getName()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
    },
});