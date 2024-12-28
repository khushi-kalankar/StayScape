import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginPage(e){
    e.preventDefault();
    try{
      const userinfo = await axios.post('/login', {email, password});
      setUser(userinfo);
      alert('Login successsful!');
      setRedirect(true);
    }catch(e){
      alert('Login failed');
      console.log(e);
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (

    <div className="mt-4 flex grow items-center justify-around">
      <div className="">
        <h1 className="text-4xl mb-4 text-center">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginPage}>
          <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <input type="password" placeholder="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }} />
          <button className="primary mt-2">Login</button>
          <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link> </div>
        </form>
      </div>
    </div>
  );
}
