import React from "react";

function Users({ applicants }) {
  return (
    <div className="h-[100vh]">
      {applicants ? (
        <>
          {applicants?.map((data, index) => (
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
                <div className="flex items-start justify-between w-full">
                  <div className="pl-3 w-full">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white "
                    >
                      {`${data?.firstname} ${data?.lastname}`}
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 "
                    >
                      {`${data?.age}` + " years old"}{" "}
                    </p>
                  </div>
                  <div role="img" aria-label="bookmark">
                    <span className="m-1 font-bold cursor-pointer text-white hover:text-gray-200"></span>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-5 py-2  text-gray-600 dark:text-gray-200 "
                >
                  <span className="font-bold">Gender</span>: {`${data?.gender}`}
                </p>

                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-5 py-2  text-gray-600 dark:text-gray-200 "
                >
                  <span className="font-bold">Age</span>: {`${data?.age}`}
                </p>

                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-5 py-2  text-gray-600 dark:text-gray-200 "
                >
                  <span className="font-bold">NIN</span>: {`${data?.nin}`}
                </p>

                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-5 py-2  text-gray-600 dark:text-gray-200 "
                >
                  <span className="font-bold">Email</span>: {`${data?.email}`}
                </p>
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

export default Users;
