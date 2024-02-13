import React from "react";

function Pools({ pools }) {
  return (
    <div className="h-auto m-2 p-4">
      {pools ? (
        <>
          {pools?.map((data, index) => (
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
                          href={`/pool/${data?.pool_id}`}
                          className="underline-none"
                        >
                          View
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
                <div tabindex="0" class="focus:outline-none flex">
                  <div class="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                    Male: {data?.percentageOfMale}%
                  </div>
                  <div class="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                    Female: {data?.percentageOfFemale}%
                  </div>
                  <div class="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                    Youth: {data?.percentageOfYouth}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
}

export default Pools;
