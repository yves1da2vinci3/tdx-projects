import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState:[],
    reducers:{
        addOffer: (state, action)=>{
            const newOffer = {
                
                ...action.payload.offer
            }
            state.push(newOffer);
        },
        deleteOffer: (state, action)=>{
            return state.filter((item) => item.id !== action.payload.id);
        }
    }
});

export const {adddOffer, deleteTask} = cartSlice.actions;

export default cartSlice.reducer;