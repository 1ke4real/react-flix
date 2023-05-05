import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
const Login = ()=>{
    const [login, setLogin] = useState<object>({
        email: '',
        password: ''
    })
    const token = "d598beac85ec8a6c9fa830227429ff7f"
    const [error, setError] = useState(false)
    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault()
        const response = await axios.get("./src/assets/db/db.json")
        const data = response.data
        const loginString = JSON.stringify({...login})
        const dataString = JSON.stringify({...data})
        const match = new RegExp(loginString, 'i').test(dataString) ? true : false;
        if (match){
            sessionStorage.setItem('token', token)
            window.location.replace('/films')
        }
        else {
            setError(true)
        }
    }
    useEffect(()=>(
        console.log(error)
    ), [error])

    return (
       <>
           <form action="" className="flex justify-center items-center h-screen" onSubmit={handleSubmit}>
               <div className="bg-slate-100 p-20 px-40 rounded-lg drop-shadow">
                   <div className="">
                       <h1 className="text-center text-4xl font-bold">Se connecter</h1>
                   </div>
                   <div className="py-5 text-2xl flex flex-col">
                       <label htmlFor="email">Email</label>
                       <input type="email" placeholder="Email" className="border-2 p-2 rounded-lg border-slate-" onChange={(e)=>(
                           setLogin({...login, email: e.target.value})
                       )}/>
                   </div>
                   <div className="py-5 text-2xl flex flex-col">
                       <label htmlFor="password">Mot de passe</label>
                       <input type="password" placeholder="Mot de passe" className="border-2 p-2 rounded-lg border-slate-" onChange={(e)=>(
                           setLogin({...login, password: e.target.value})
                       )}/>
                   </div>
                   <div className="py-5 text-2xl flex justify-center">
                       <input type="submit" value="Envoyer" className="border-2 p-5 px-10 rounded-lg border-blue-500 text-blue-500"/>
                   </div>
                   {error && (
                       <p className="text-red-500 text-center text-6xl">Tu rentre pas </p>
                   )}
               </div>

           </form>
       </>
    )
}

export default Login
