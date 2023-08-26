import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import Player from "./Player";

export default function PlayerList() {
    const playerArray = useSelector((state) => state.players.players);

    return(
        <ScrollView style={styles.container}>
            {(playerArray && playerArray.length > 0) ? playerArray.map(player => <Player key={player.name} name={player.name} balance={player.balance} />) : <Text style={styles.empty}>No players.</Text>}
            <View style={{ flex: 1, height: 20, }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
    },
    empty: {
        flex: 1,
        backgroundColor: '#F1F0F1',
        padding: 5,
        borderRadius: 3,
        fontSize: 20,
    },
});