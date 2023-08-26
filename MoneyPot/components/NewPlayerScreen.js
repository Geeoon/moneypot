import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../redux/Players/playersSlice';

export default function NewPlayerScreen({navigation}) {
    const playerArray = useSelector((state) => state.players.players);
    const defaultBuyIn = useSelector((state) => state.players.lastBuyIn);
    const dispatch = useDispatch();
    
    const [playerName, setPlayerName] = useState('');
    const [buyIn, setBuyIn] = useState(defaultBuyIn);

    useEffect(() => {
        parseInputs();
    }, []);

    const parseInputs = useCallback(() => {
        const parsedBuyIn = buyIn ? parseFloat(buyIn).toFixed(2) : Number(0).toFixed(2);
        setBuyIn(parsedBuyIn);
        return {
            name: playerName,
            buy: parsedBuyIn,
        };
    }, [playerName, buyIn]);

    const submit = useCallback(() => {
        const {name, buy} = parseInputs();
        if (name === '') {
            Alert.alert("You must have a player name");
            return;
        }
        if (playerArray.findIndex((player) => player.name === name) !== -1) {
            Alert.alert("There is already a player with this name");
            return;
        }
        dispatch(addPlayer({name: name, buyIn: buy,}));
        Alert.alert("Added player!");
    }, [parseInputs, playerArray]);


    return (
        <View style={styles.container}>
            <View style={styles.sideBySide}>
                <Text style={styles.text}>Player Name: </Text>
                <TextInput
                    onChangeText={text => setPlayerName(text)}
                    value={playerName}
                    style={styles.nameInput}
                />
            </View>
            <View style={styles.sideBySide}>
                <Text style={styles.text}>Buy-in: $</Text>
                <TextInput
                    onChangeText={text => setBuyIn(text)}
                    onEndEditing={(e) => setBuyIn(parseFloat(e.nativeEvent.text).toFixed(2))}
                    value={'' + buyIn}
                    inputMode='decimal'
                    style={styles.buyInInput}
                />
            </View>
            <View style={styles.options}>
                <View style={{flex: 1, paddingRight: 5,}}>
                    <Button
                        title='Add Player'
                        onPress={() => { 
                            submit();
                            setPlayerName('');
                        }}
                    />
                </View>
                <Button
                    title='Done!'
                    onPress={() => {
                        navigation.navigate('Main');
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    text: {
        fontSize: 20,
    },
    nameInput: {
        flex: 1,
        color: 'white',
        backgroundColor: '#333333',
        fontSize: 20,
        padding: 4
    },
    buyInInput: {
        width: 100,
        color: 'white',
        backgroundColor: '#333',
        fontSize: 20,
        padding: 4
    },
    modifyInput: {
        width: 100,
        color: 'white',
        backgroundColor: '#333333',
    },
    sideBySide: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    options: {
        flexDirection: 'row',
    }
});