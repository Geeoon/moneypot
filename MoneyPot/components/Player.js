import { useCallback, useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rebuy, cashOut } from "../redux/Players/playersSlice";
// BLUE: 0446AB
// RED: F71C36
// WHITE: F1F0F1
// GREEN: 016E57
// BLACK: 000000

export default function Player(props) {
    const lastBuyIn = useSelector((state) => state.players.lastBuyIn);
    const [modifyBy, setModifyBy] = useState(Number(0).toFixed(2));
    const dispatch = useDispatch();

    const parseInputs = useCallback(() => {
        const parsedModify = modifyBy ? parseFloat(modifyBy).toFixed(2) : Number(0).toFixed(2);
        setModifyBy(parsedModify);
        return parsedModify;
    }, [modifyBy]);

    return (
        <View style={styles.container}>
            <View style={styles.nbContainer}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.balance}>{(props.balance !== null) && (props.balance < 0 ? '-$' + Math.abs(props.balance).toFixed(2) : '$' + props.balance.toFixed(2))}</Text>
            </View>
            <View style={styles.modifyContainer}>
                <View style={styles.autoModifyContainer}>
                    <Button title={`Rebuy for $${lastBuyIn.toFixed(2)}`}
                    onPress={() => {
                        dispatch(rebuy({name: props.name, amount: lastBuyIn}));
                    }}
                    color='#F71C36'/>
                    <Button title={`Cash out $${lastBuyIn.toFixed(2)}`}
                    onPress={() => {
                        dispatch(cashOut({name: props.name, amount: lastBuyIn}));
                    }}
                    color='#016E57'/>
                </View>
                <View style={styles.customModifyContainer}>
                    <TextInput
                        onChangeText={text => setModifyBy(text)}
                        onEndEditing={(e) => e.nativeEvent.text ? setModifyBy(parseFloat(e.nativeEvent.text).toFixed(2)) : Number(0).toFixed(2)}
                        value={'' + modifyBy}
                        inputMode='decimal'
                        style={styles.customInput}
                    />
                    <View>
                        <Button title='Rebuy'
                        onPress={() => {
                            dispatch(rebuy({name: props.name, amount: parseInputs()}));
                        }}
                        color='#F71C36'/>
                        <Button title='Cash out'
                        onPress={() => {
                            dispatch(cashOut({name: props.name, amount: parseInputs()}));
                        }}
                        color='#016E57'/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0446AB',
        padding: 10,
        borderRadius: 3,
        borderColor: '#F1F0F1',
        borderWidth: 2,
        marginBottom: 10,
        flexDirection: 'column',
    },
    nbContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    modifyContainer: {
        flexDirection: 'row',
    },
    autoModifyContainer: {
        flexDirection: 'column',
    },
    customModifyContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    customInput: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#F1F0F1',
        paddingLeft: 5,
        fontSize: 20
    },
    name: {
        color: '#F1F0F1',
        fontSize: 25,
        flex: 1,
    },
    balance: {
        color: '#F1F0F1',
        fontSize: 25,
    },
    rebuyButton: {
        backgroundColor: "#016E57",
        color: '#F1F0F1',
        borderRadius: 0,
    },
    cashOutButton: {
        backgroundColor: "#F71C36",
        color: '#F1F0F1',
        borderRadius: 0,
    }
});