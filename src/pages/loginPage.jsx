import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    //hooks
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    

    function handleLogin(){
        console.log("Email: ",email);
        console.log("Password: ",password);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email : email,
            password : password
        }).then(
            (response)=>{
                console.log("Login successful!",response.data);
                toast.success("Login successful");
                localStorage.setItem("token",response.data.token);

                const user = response.data.user;

                if(user.role == "admin"){
                    navigate("/admin")
                }else {
                    navigate("/")
                }
                
                
            }
        ).catch(
            (error)=>{
                console.log("Login Failed!!", error.response.data);
                toast.error(error.response.data.message || "Login failed");
            }
        )

        console.log("Login button pressed");
    }


    return(
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">
                
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    } className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="email" />
                    <input onChange = {
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="password" />
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-400 text-black rounded-xl cursor-pointer">Login</button>
                </div>
            </div>
        </div>
    )
}
