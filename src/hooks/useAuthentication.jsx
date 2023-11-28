import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useEffect, useState } from "react"

export const useAuthetication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();
 
    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }
    // Register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user,{
                displayName: data.displayName
            })
            console.log(user,'user')
            setLoading(false)
            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = 'A senha precisa conter pelomenos 6 caracteres'
            }else if(error.message.includes("email-already")){
                systemErrorMessage = 'E-mail já cadastrado'
            }else{
                systemErrorMessage = 'Ocorreu erro, por favor tente mais tarde'
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
        
    };

    // Logout
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth)
    }
    // Login

    const login = async(data) => {
        checkIfIsCancelled()
       
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth,data.email,data.password)
            setLoading(false)
        } catch (error) {
            console.log(typeof error.message)
            let systemErrorMessage
            if(error.message.includes("user-not-found")){
                systemErrorMessage = 'Usuario não encontrado.' 
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = 'Senha incorreta'
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }
    useEffect(() => {
        return() => setCancelled(true);
    },[]);

    return{
        auth,
        error,
        loading,
        createUser,
        logout,
        login,
    }
}