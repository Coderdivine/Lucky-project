import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RegisterAuth } from "../services/register.auth";
import { AdminAuth } from "../services/admin.service";

function Register() {
  const [email, setEmail] = useState("");
  const { pool_id } = useParams();
  const [ pool, setPool ] = useState(null);
  const [phone_number, setPhone_number] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Choose gender");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nin, setNin] = useState("");
  const [state, setState] = useState(sessionStorage.getItem("lucky-region") || "State");
  const [isDisabledState, setIsDisabledState] = useState(true);
  const [ txt, setTxt ] = useState("Submit");

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const response = await new AdminAuth().getPool(pool_id);
        if(response) {
          console.log({ fetchedPool: response?.data });
          setPool(response?.data);
        }
      } catch (error) {
        let msg = error.message;
        if (error.response) {
          msg = error.response?.data.message;
        }
        console.log({ msg });
      }
    }

    fetchPool();
  }, []);

  const Submit = async (e) => {
    e.preventDefault();
    try {
     if(gender == "Choose gender"){
        alert("Please choose a gender");
     } else {
      const data = {
        email,
        phone_number,
        age,
        gender,
        firstname,
        lastname,
        nin,
        state,
        pool_id
      };
      const response = await new RegisterAuth().RegisterToPool(data);
      if(response) {
        alert("Registration completed.");
      }
     }
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      alert(msg);
      setTxt("Register.")
    }
  };


  return (
    <div>
      <section class="bg-black dark:bg-gray-900">
        <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form class="w-full max-w-md">

            <h1 class="text-indigo-600 mt-9 text-2xl font-bold capitalize sm:text-3xl dark:text-white">
              Apply {(pool && "to " + pool?.title) || ""}
            </h1>

            <div class="relative flex items-center mt-8">
              <span class="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="First name"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Last name"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Age"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <input
                type="number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Phone number"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <input
                type="text"
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="NIN number"
              />
            </div>

            <div class="relative flex items-center mt-8">
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                className='class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"'
              >
                <option>Choose gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
            </div>

            <div class="relative flex items-center mt-8">
              <input
                disabled={isDisabledState}
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="State/Region"
              />
            </div>

            <div class="mt-6">
              <button
                onClick={(e) => Submit(e)}
                class="w-full mb-8 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring focus:bg-indigo-800 focus:ring-opacity-50"
              >
                {txt}
              </button>
             
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
