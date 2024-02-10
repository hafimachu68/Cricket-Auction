import { createSlice } from "@reduxjs/toolkit";

const generalSlice=createSlice({
    name:'user',
    initialState:{
        userDetail:{},
        userRole:''

    },
    reducers:{
        setuserDetail:(state,action)=>{
            state.userDetail={name:'same'}

        },
        setuserRole:(state,action)=>{
            state.userRole='admin'
        }    }
}) 

export const{setuserDetail,setuserRole}=generalSlice.actions
export default generalSlice.reducer