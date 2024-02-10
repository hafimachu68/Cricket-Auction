import{createSlice}from'@reduxjs/toolkit';

const INITALSTATE={
userDetail:JSON.parse(localStorage.getItem('user')) ?? {},
    
}


const generalSlice=createSlice({
    name:'user',
    initialState:INITALSTATE,
    reducers:{
        setuserDetail:(state,action)=>{
            state.userDetail=action.payload
        }
    }
})

export const{setuserDetail,setuserRole}=generalSlice.actions
export default generalSlice.reducer