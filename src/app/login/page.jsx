"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { postLogin } from '@/models/login'
import { addDataUser } from '@/redux/loginSlice';
import { useDispatch } from 'react-redux';

function Login() {

    const router = useRouter()

    const dispatch = useDispatch()

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function logueo() {
        const data = {
            "username": user,
            "password": password
        }
        postLogin(data).then((response) => {
            const datos = {
                "user":response.data.user,
            }
            Cookies.set("token", response.data.token, { expires: 1 });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("refresh_token", response.data.refresh_token)
            localStorage.setItem("user", response.data.user)
            dispatch(addDataUser(datos))
            router.push('/main/dashboard')
        }).catch((error)=> {})
    }

    return (
        <div>
            <input type='text' placeholder='user' value={user} onChange={(event) => setUser(event.target.value)} />
            <input type='password' placeholder='clave' value={password} onChange={(event) => setPassword(event.target.value)} />
            <button onClick={logueo}>Login</button>
        </div>
    )
}

export default Login