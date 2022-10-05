import Router from 'next/router'
import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '../../model/Usuario'
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    Logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL       
    }
}

function GerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('admin-template-kaue-auth', logado, {
            expires: 7
        })
    }else {
        Cookies.remove('admin-template-kaue-auth')
    }
}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase) {
        if(usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            GerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        }else {
            setUsuario(null)
            GerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
                configurarSessao(resp.user)
                Router.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function Logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('admin-template-kaue-auth')){
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            Logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext