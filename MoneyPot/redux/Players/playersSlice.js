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
                balance: Number(-action.payload.buyIn),
            });
            state.lastBuyIn = Number(action.payload.buyIn);
        },

        rebuy: (state, action) => {
            const index = state.players.findIndex((player) => player.name === action.payload.name);
            if (index === -1) {
                return;
            }
            state.players[index].balance -= Number(action.payload.amount);
        },

        cashOut: (state, action) => {
            const index = state.players.findIndex((player) => player.name === action.payload.name);
            if (index === -1) {
                return;
            }
            state.players[index].balance += Number(action.payload.amount);
        },

        resetAll: (state) => {
            state.players = initial.players;
            state.lastBuyIn = initial.lastBuyIn;
        },
    },
});

export const { addPlayer, resetAll, rebuy, cashOut } = playersSlice.actions;

export default playersSlice.reducer;