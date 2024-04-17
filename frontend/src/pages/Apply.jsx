import React, { useEffect, useState } from "react";
import { AdminAuth } from "../services/admin.service";

function Apply() {
  const [sensor, setSensor] = useState(null);
  const [state, setState] = useState(
    "Enugu" || sessionStorage.getItem("lucky-region") || "Enugu"
  );

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await new AdminAuth().getPools(state);
        if (response) {
          setSensor(response?.data);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    fecthData();
  }, []);

  return (
    <div className="bg-black text-white h-auto">
      <div className="bg-black mt-8">
        <p className="font-bold m-4 text-center p-2">
          Population sensor near you
        </p>
      </div>
      <div
        aria-label="group of cards"
        tabIndex="0"
        className="focus:outline-none py-8 w-full"
      >
        <div className="lg:flex items-center justify-center w-full mt-7 h-[100vh] p-2 m-2">
          {sensor ? (
            sensor.map((data, index) => (
              <div
                key={index}
                aria-label={`card ${index + 1}`}
                tabIndex="0"
                className={`focus:outline-none lg:w-4/12 lg:mb-0 mb-7 p-6 shadow rounded-md ${
                  index % 2 === 0
                    ? "lg:mr-7 bg-white dark:bg-gray-800 float-left m-2 p-3" 
                    : "lg:ml-7 bg-white dark:bg-gray-800 float-right m-2 p-3" 
                }`}
              >
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-6">
                  <img
                    src="images/nigeriaflag.jpeg"
                    alt="coin avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white "
                      >
                        {data?.state}
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 "
                      >
                        {`${data?.total} citizens`}
                      </p>
                    </div>
                    <div role="img" aria-label="bookmark">
                      <span className="m-1 font-bold cursor-pointer text-white hover:text-gray-200">
                        <a
                          href={`/apply/${data?.pool_id}`}
                          className="underline-none"
                        >
                          Apply
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <p
                    tabIndex="0"
                    className="focus:outline-none text-sm leading-5 py-4 text-gray-600 dark:text-gray-200 "
                  >
                    {`Title: ${data?.title}`}
                  </p>
                  <p
                    tabIndex="0"
                    className="focus:outline-none text-sm leading-5 py-4 text-gray-600 dark:text-gray-200 "
                  >
                    {`Description: ${data?.description}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Apply;
