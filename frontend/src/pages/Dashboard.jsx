import React, { useEffect, useState } from "react";
import Pools from "./Pools";
import { AdminAuth } from "../services/admin.service";

function Dashboard() {
  const adminConfig = JSON.parse(sessionStorage.getItem("admin-details-lucky"));
  const [pools, setPools] = useState(null);
  const REGIONS = [
    "Enugu North",
    "Enugu South",
    "Enugu East",
    "Enugu West",
    "Aninri",
    "Awgu",
    "Ezeagu",
    "Igbo Etiti",
    "Igbo Eze North",
    "Igbo Eze South",
    "Isi Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
  ];
  const [region, setRegion] = useState("");
  const [state, setState] = useState("Enugu");
  const [title, setTitle] = useState("");
  const [txt, setTxt] = useState("Create");
  const [description, setDescription] = useState("");
  const [admin_id, setAdmin_id] = useState(adminConfig?.admin_id || "");
  const [modal, setModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin-config")) {
      const sessionData = JSON.parse(sessionStorage.getItem("admin-config"));
      setAdmin_id(sessionData);
    }
  }, []);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await new AdminAuth().getAdminPools(admin_id);
        if (response) {
          setPools(response?.data);
        }
      } catch (error) {
        let msg = error.message;
        if (error.response) {
          msg = error.response?.data.message;
        }
        console.log({ msg });
      }
    };

    fecthData();
  }, []);

  const createPool = async (e) => {
    e.preventDefault();
    try {
      if (region.length > 2) {
        const data = {
          state,
          region,
          title,
          description,
          admin_id,
        };

        const response = await new AdminAuth().createPool(data);
        if (response) {
          alert("Pool created.");
          window.location.reload();
        }
      } else {
        alert("Please choose a region");
      }
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      alert(msg);
      setTxt("Create");
    }
  };

  const updatePoolStatus = async (e, pool_id, status) => {
    e.preventDefault();
    try {
      alert("Pool details updated.");
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      alert(msg);
      setTxt("Sign in again");
    }
  };

  return (
    <div className="bg-black p-2 m-1 text-white">
      <div className="col">
        <h1 className="font-bold text2xl line-clamp-3">
          Population Census {state ? "in " + state : ""}
        </h1>
        <button
          className="m-2 px-8 py-3 text-center rounded-sm text-white bg-slate-800"
          onClick={(e) => setIsModalOpen(!isModalOpen)}
        >
          {isModalOpen ? "Close" : "Create Pool"}
        </button>
      </div>

      {isModalOpen && (
        <div className="modal fixed inset-0 z-50 grid place-items-center">
          <div className="w-full max-w-2xl max-h-full dark:bg-slate-800 bg-opacity-70">
            <div className="relative p-4">
              <div className="relative bg-white rounded-lg shadow dark:bg-slate-800">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create LGA in {state}
                  </h3>
                  <button
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                   
                  </p>

                  <form class="m-2 p-4 text-center">
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      value={title}
                      class="block w-full py-3 mt-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />

                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Description"
                      class="block w-full py-3 mt-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />

                    <select
                      class="block w-full py-3 mt-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) => setRegion(e.target.value)}
                    >
                      {REGIONS?.map((r) => (
                        <option>{r}</option>
                      ))}
                    </select>

                    <input
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      value={state}
                      disabled={true}
                      class="block w-full py-3 mt-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </form>
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={(e) => createPool(e)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {pools && <Pools pools={pools} />}
    </div>
  );
}

export default Dashboard;
