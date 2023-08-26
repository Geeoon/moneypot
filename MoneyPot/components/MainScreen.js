import { StyleSheet, View, Text, ImageBackground, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetAll } from '../redux/Players/playersSlice';
import PlayerList from './PlayerList';
// const image = require('../assets/images/poker-table.jpg');
/* <ImageBackground source={image} resizeMode="repeat" style={styles.background}> */
/* </ImageBackground> */

export default function MainScreen({navigation}) {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Button
                title='Restart'
                onPress={() => {
                    Alert.alert('Restart', 'Are you sure you want to restart?  Everything will be deleted!', [
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                        {
                            text: 'YES',
                            onPress: () => {
                                dispatch(resetAll());
                            }
                        }
                    ]);
                }}
                color='#F71C36'
            />
            <Button
                title='Add Player'
                onPress={() => navigation.navigate('New Player')}
            />
            <PlayerList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#155843',
    },
    background: {
        flex: 1,
    },
});