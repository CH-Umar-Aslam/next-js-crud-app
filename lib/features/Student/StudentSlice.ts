import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
  studentData: any
}

const initialState: CounterState = {
  studentData: [],
}

export const StudentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
   addStudent:(state,action)=>{
    state.studentData.push(action.payload)
    
   },
   updateStudent:(state,action)=>{
    console.log("hello");
    
    // state.studentData=[]
    state.studentData=action.payload;
    // console.log(state.studentData);
    
   }

  },
})

// Action creators are generated for each case reducer function
export const { addStudent,updateStudent } = StudentSlice.actions

export default StudentSlice.reducer