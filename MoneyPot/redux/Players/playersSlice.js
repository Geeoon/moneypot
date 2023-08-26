import { createSlice } from "@reduxjs/toolkit";

const initial = {
    players: [],
    lastBuyIn: Number(1).toFixed(2),
}
export const playersSlice = createSlice({
    name: 'players',
    initialState: initial,
    reducers: {
        addPlayer: (state, action) => {
            state.players.push({
                name: action.payload.name,
                balance: action.payload.buyIn,
            });
            console.log(`Add ${action.payload.name} with ${action.payload.buyIn} buy in.`);
        },

        resetAll: (state) => {
            state.players = initial.players;
            state.lastBuyIn = initial.lastBuyIn;
            console.log("reset!");
        },
    },
});

export const { addPlayer, resetAll } = playersSlice.actions;

export default playersSlice.reducer;