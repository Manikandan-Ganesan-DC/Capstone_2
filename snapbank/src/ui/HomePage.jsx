// App Imports
import React, { useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// Api Base URL
const baseURL = "https://localhost:3000";
// const baseURL = "https://192.168.2.33:3000";

// Home Page Component bg-[#EDECF0]
function HomePage() {
  useEffect(() => {}, []);

  return (
    <div className=" relative w-full sm:h-screen overflow-hidden select-none flex">
      <div className=" w-32 h-full flex flex-col bg-[#6c63ff] justify-start">
        {/* ICON */}
        <div className=" flex justify-center p-1 my-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className=" fill-[#ffffff] w-8 h-8"
          >
            <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </div>
        {/* MENU */}
        <div className=" mt-2">
          <ul className="space-y-5 pl-2">
            <li className=" pl-2">
              <div className=" flex flex-col justify-center items-center p-1 rounded-l-xl bg-[#EDECF0]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className=" fill-[#000000] w-8 h-8"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                <label className=" text-[#000000] font-semibold text-sm">
                  Home
                </label>
              </div>
            </li>
            <li className=" pl-2">
              <div className=" flex flex-col justify-center items-center p-1 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className=" fill-[#ffffff] w-8 h-8"
                >
                  <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
                </svg>
                <label className=" text-[#ffffff] font-semibold text-sm">
                  Move Money
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className=" flex flex-col w-full h-full px-2 bg-[#EDECF0]">
        <div className=" flex h-16 px-2 py-1 mt-9 border-b-2 border-[#000000] justify-between">
          <h1 className=" ml-5 my-auto font-bold text-xl">My Account</h1>
          <div className=" bg-[#000000] rounded-full w-11 h-11 flex justify-center items-center p-1 mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className=" fill-[#ffffff] w-6 h-6"
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              {/* <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /> */}
            </svg>
          </div>
        </div>
        <div className="h-full flex p-1 relative">
          {/* CONTENT */}
          <div className="min-w-[70%] flex flex-col justify-start relative space-y-4 pt-10 pl-5 h-full">
            {/* SAVINGS */}
            <div className=" w-full max-w-lg rounded-xl bg-[#ffffff] flex flex-col p-4">
              <div className=" flex justify-between">
                <div className=" w-fit flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className=" fill-[#6c63ff] w-6 h-6"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                  </svg>
                  <h1 className=" ml-2 font-bold text-xl">Banking</h1>
                </div>
                <div className=" w-fit flex space-x-1">
                  <span>Total Balance</span>
                  <h1 className=" ml-2 font-bold text-xl">$500.00</h1>
                  <span>CAD</span>
                </div>
              </div>
              <div className=" mt-2">
                <ul className=" bg-[#EDECF0] rounded-lg p-2">
                  <li className=" flex justify-between items-center border-b-2 border-[#000000]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Savings Advantage
                      </span>
                      <span className=" font-light text-sm">Savings</span>
                    </div>
                    <div className=" font-semibold text-xl">$250.00</div>
                  </li>
                  <li className=" flex justify-between items-center border-b-2 border-[#000000]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Momentum PLUS
                      </span>
                      <span className=" font-light text-sm">Chequing</span>
                    </div>
                    <div className=" font-semibold text-xl">$250.00</div>
                  </li>
                </ul>
              </div>
            </div>
            {/* CREDIT */}
            <div className=" w-full max-w-lg rounded-xl bg-[#ffffff] flex flex-col p-4">
              <div className=" flex justify-between">
                <div className=" w-fit flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className=" fill-[#000000] w-6 h-6"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                  </svg>
                  <h1 className=" ml-2 font-bold text-xl">Credit Cards</h1>
                </div>
                <div className=" w-fit flex space-x-1">
                  <span>Total Spent</span>
                  <h1 className=" ml-2 font-bold text-xl">$100.00</h1>
                  <span>CAD</span>
                </div>
              </div>
              <div className=" mt-2">
                <ul className=" bg-[#EDECF0] rounded-lg p-2">
                  <li className=" flex justify-between items-center border-b-2 border-[#000000]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Snap Visa PLUS
                      </span>
                      <span className=" font-light text-sm">Visa</span>
                    </div>
                    <div className=" font-semibold text-xl">$100.00</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* SIDE INFO */}
          <div className=" w-full flex flex-col justify-start pr-5">
            <div className="flex flex-col mt-10 bg-[#ffffff] rounded-xl p-2">
              <div className=" flex p-1 border-b-2 border-[#000000]">
                <h1 className="my-auto font-bold text-xl">MY BALANCES</h1>
              </div>

              <div className=" flex justify-start py-1 px-4">
                <div className=" flex flex-col w-[45%] items-start">
                  <div className=" flex items-center justify-around space-x-2">
                    <span className=" bg-[#6c63ff] h-2 w-2 rounded-xl"></span>
                    <span>I have</span>
                  </div>
                  <span className=" font-semibold text-xl">$500.00</span>
                </div>
                <div className=" flex flex-col w-[45%] items-start">
                  <div className=" flex items-center justify-around space-x-2">
                    <span className=" bg-[#000000] h-2 w-2 rounded-xl"></span>
                    <span>I own</span>
                  </div>
                  <span className=" font-semibold text-lg">$100.00</span>
                </div>
              </div>
              <div className=" flex justify-around bg-[#EDECF0] rounded-lg p-1">
                <span>Total Balance</span>
                <span className=" font-semibold text-lg">$400.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
