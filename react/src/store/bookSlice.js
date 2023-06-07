import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const getBooks=createAsyncThunk("book/getBooks",async (_,thunkAPI)=>{
    const {rejectedWithValue} = thunkAPI
    try{
        const res=await fetch("http://localhost:3005/books");
        const data=res.json();
        return data;
    }   
    catch(e){
        return rejectedWithValue(e.message);
    }
})

export const insertBooks=createAsyncThunk("book/insertBooks",async (bookData,thunkAPI)=>{
    const {rejectedWithValue} = thunkAPI
    try{

        const res=await fetch("http://localhost:3005/books",{
            method: "POST",
            body:JSON.stringify(bookData),
            headers:{
                "Content-Type": "application/json; Charset=utf-8"
            }
        });
        const data=res.json();
        return data;
    }   
    catch(e){
        return rejectedWithValue(e.message);
    }
})

export const deleteBooks=createAsyncThunk("book/deleteBooks",async (id,thunkAPI)=>{
    const {rejectedWithValue} = thunkAPI
    try{

        const res=await fetch(`http://localhost:3005/books/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json; Charset=utf-8"
            }
        });
        return id;
    }   
    catch(e){
        return rejectedWithValue(e.message);
    }
})


const bookSlice=createSlice({
    name:"book",
    initialState:{books:[],isLoading:false,error:null},
    extraReducers:{
        [getBooks.pending]:(state,action)=>{
            state.isLoading=true;
            state.error=null;
        },
        [getBooks.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.books=action.payload;
        },
        [getBooks.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        },

        // -------------------

        [insertBooks.pending]:(state,action)=>{
            state.isLoading=true;
            state.error=null;
        },
        [insertBooks.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.books.push(action.payload);
        },
        [insertBooks.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        },

        // -------------------

        [deleteBooks.pending]:(state,action)=>{
            state.isLoading=true;
            state.error=null;
        },
        [deleteBooks.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.books=state.books.filter(el=>{
                return el.id !== action.payload;
            })
        },
        [deleteBooks.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        }
    }
})

export default bookSlice.reducer;