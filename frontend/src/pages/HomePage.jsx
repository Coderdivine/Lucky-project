import React, { useEffect, useState } from "react";

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile screen
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div>
      <header class="absolute text-white left-0 top-0 z-50 w-full p-4  -mt-6">
        <div class="container mx-auto">
          <div class="relative -mx-4 flex items-center justify-between">
            <div class="w-60 max-w-full px-4">
              <a class="block w-full py-5">
                <img src="images/nigeriaflag.jpeg" alt="logo" class="w-12 h-12 rounded-full" />
              </a>
            </div>
            <div class="flex w-full items-center justify-between px-4">
              <div>
                {isMobile && (
                  <button
                    className="absolute right-4 top-1/2 block  -translate-y-1/2 rounded-lg px-3 py-[6px]   ring-primary focus:ring-2 lg:hidden"
                    onClick={handleMenuClick}
                  >
                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-indigo-600"></span>
                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-indigo-600"></span>
                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-indigo-600"></span>
                  </button>
                )}

                {isMobile && isMenuOpen && (
                  <nav className="absolute border-indigo-600 bg-black right-4 top-full w-full max-w-[250px] rounded-lg py-5 px-6 shadow transition-all lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none">
                    <ul className="block lg:flex">
                     
                      <li>
                        <a
                          href="/apply"
                          className="flex py-2 hover:text-indigo-600 text-base font-medium text-dark hover:text-primary lg:ml-12 lg:inline-flex"
                        >
                          Apply
                        </a>
                      </li>
                      <li>
                        <a
                          href="/login"
                          className="flex py-2 hover:text-indigo-600 font-bolder text-base font-medium text-dark hover:text-primary lg:ml-12 lg:inline-flex"
                        >
                          Login
                        </a>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
              <div class="hidden justify-end pr-16 sm:flex lg:pr-0">
                <a
                  href="/apply"
                  class="py-3 px-7 hover:text-indigo-600 text-base font-medium text-dark hover:text-primary"
                >
                  Apply
                </a>
                <a
                  href="/login"
                  class="rounded-lg hover:text-indigo-600 bg-primary py-3 px-7 text-base font-medium text-white hover:bg-opacity-90"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="relative h-[100vh] text-white bg-black pt-[120px] pb-[110px] lg:pt-[150px] p-4">
        <div class="container mx-auto">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 lg:w-5/12">
              <div class="hero-content">
                <h1 class="mb-3 mt-6 text-4xl font-bold leading-snug text-dark sm:text-[42px] lg:text-[40px] xl:text-[42px]">
                Nigeria Population Sensor Project{" "}
                  <span className="font-bold text-indigo-600">Smart Data</span>.{" "}
                  <br />
                   for a Smarter Nigeria <br />
                  and Reinvent
                </h1>
                <p class="mb-2 max-w-[480px] text-base text-body-color">
                Discover real-time population insights with our innovative sensor project. 
                Empowering communities for better planning and resource allocation.
                Join us in shaping a connected and informed future.
                </p>
                <ul class="flex flex-wrap items-center"></ul>

              </div>
            </div>
            <div class="hidden px-4 lg:block lg:w-1/12"></div>
            <div class="w-full px-4 lg:w-6/12">
              <div class="lg:ml-auto lg:text-right">
                <div class="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="images/nigeriapop1.jpeg"
                    alt="hero"
                    style={{ opacity: 0.8 }}
                    class="max-w-full sm:p-4 lg:ml-auto rounded-[30px]"
                  />
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
