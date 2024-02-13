import React, { useState, useEffect } from "react";
import { AdminAuth } from "../services/admin.service";

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("choose a gender");
  const [age, setAge] = useState("");
  const [nin, setNin] = useState("");
  const [state, setState] = useState(sessionStorage.getItem("lucky-region") || "State");
  const [country, setCountry] = useState("Nigeria");
  const [txt, setTxt] = useState("Sign Up");
  const [isDisabledState, setIsDisabledState] = useState(true);

  const Submit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      email,
      phone_number,
      firstname,
      lastname,
      gender,
      age,
      nin,
      state,
      country,
      password,
    };
    try {
      setTxt("Signing up...");
      const response = await new AdminAuth().register(dataToSend);
      if (response) {
        window.location = "/login";
        setTxt("Sign Up");
      } else {
        alert("Unable to complete sign up.");
      }
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      alert(msg);
      setTxt("Sign up again");
    }
  };

  return (
    <div>
      <section class="bg-black dark:bg-gray-900">
        <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form class="w-full max-w-md">
            {/* <img class="w-auto h-7 sm:h-8" src="https://axgura.com/logo.png" alt="" /> */}

            <h1 class="text-indigo-600 text-2xl font-bold capitalize sm:text-3xl dark:text-white">
              Sign Up as an Amdin
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
                <option>Male</option>
                <option>Female</option>
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

            <div class="relative flex items-center mt-4">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            <div class="relative flex items-center mt-4">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
              />
            </div>

            <div class="mt-6">
              <button
                onClick={(e) => Submit(e)}
                class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring focus:bg-indigo-800 focus:ring-opacity-50"
              >
                {txt}
              </button>
              <div class="mt-6 text-center ">
                <a
                  href="/login"
                  class="text-sm text-indigo-600 hover:underline dark:text-blue-400"
                >
                  Have an account ? Sign In
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminRegister;
