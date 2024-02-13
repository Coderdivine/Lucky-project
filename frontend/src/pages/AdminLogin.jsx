import React, { useEffect, useState } from "react";
import { AdminAuth } from '../services/admin.service';


function AdminLogin() {
  const [ email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [ txt, setTxt ] = useState("SignIn");

  useEffect(()=>{
      if(sessionStorage.getItem("Authentication--force")){
          window.location = "/dashboard";
      }
  },[]);

  const SignUp = async(e) => {
      e.preventDefault();
      try {
        setTxt("Sgining in...");
        const response = await new AdminAuth().login({ email, password });
        if(response) {
          console.log({ responseData: response?.data });
          sessionStorage.setItem("admin-details-lucky", JSON.stringify(response?.data || []));
          window.location = "/dashboard";
          setTxt("Signin");
        } else {
          alert("Unable to sign in");
        }
      } catch (error) {
        let msg = error.message;
            if(error.response){
                msg = error.response?.data.message
            }
      alert(msg);
      setTxt("Sign in again"); 
      }
  }


return (
  <div>
      <section class="bg-black dark:bg-gray-900">
          <div class="container flex  flex-col items-center justify-center  min-h-screen px-6 mx-auto">
              <form class="w-full text-center justify-center max-w-md">
                  
                  <h1 class="text-2xl font-bold text-indigo-600  sm:text-3xl dark:text-indigo-600">Sign In as an Admin</h1>

                  <div class="relative flex items-center mt-8">
                      <span class="absolute">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                      </span>

                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                  </div>

                  <div class="relative flex items-center mt-4">
                      <span class="absolute">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                      </span>

                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                  </div>

                  <div class="mt-6">
                      <button onClick={(e)=>SignUp(e)} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                          {txt}
                      </button>

                      <div class="mt-6 text-center ">
                          <a href="/register" class="text-sm text-indigo-600 hover:underline dark:text-indigo-600">
                              Don’t have an account yet? Sign up
                          </a>
                      </div>
                  </div>
              </form>
          </div>
      </section>
  </div>
)
}

export default AdminLogin;
