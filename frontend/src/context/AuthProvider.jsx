import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ hola, setHola ] = useState('Hola Mundo')
    return (
        <AuthContext.Provider
           value ={{

           }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext