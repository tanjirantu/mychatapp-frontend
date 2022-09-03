import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Buyer } from '../modules/common/types/Buyer';

const initialState: {
    data: null | Buyer;
} = {
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: typeof initialState, action: PayloadAction<Buyer>) {
            state.data = action.payload;
        },

        removeUser(state: typeof initialState) {
            state.data = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
