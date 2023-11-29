import { useEffect, useReducer, useState } from "react"
import {db} from '../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch (action.type){
        case "LOADING":
            return { loading:true, error:null };
        case "DELETED_DOC":
            return { loading:false, error:null };
        case "ERROR":
            return { loading:false, error: action.payload}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer,initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }
    const deleteDocument = async(id) => {
        checkCancelBeforeDispatch({
            type:'LOADING',
            payload:'',
        })
        console.log('chegeui')
        try {
            console.log('chegeui try')
            const deleteDocument = await deleteDoc(doc(db,docCollection,id))
            checkCancelBeforeDispatch({
                type:'DELETED_DOC',
                payload:deleteDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type:'ERROR',
                payload:error.message,
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[]);

    return{
        deleteDocument,
        response
    }
}