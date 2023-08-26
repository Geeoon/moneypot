import { View, StyleSheet, Text } from "react-native";
// BLUE: 0446AB
// RED: F71C36
// WHITE: F1F0F1
// BLACK: 000000

export default function Player(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.balance}>{props.balance}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0446AB',
        padding: 5,
        borderRadius: 3,
        borderColor: '#F1F0F1',
        borderWidth: 2,
        marginBottom: 10,
    },
    name: {
        color: '#F1F0F1',
        fontSize: 20,
    },
    balance: {
        color: '#F1F0F1',
        fontSize: 17,
    },
});