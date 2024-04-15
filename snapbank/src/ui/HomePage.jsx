// App Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// axios.defaults.withCredentials = true;

// Api Base URL
const baseURL = "http://localhost:4000";
// const baseURL = "https://192.168.2.33:3000";

// Home Page Component bg-[#EDECF0]
function HomePage() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileDropDown, setprofileDropDown] = useState(false);

  //Ledger
  const [savings, setSavings] = useState(0);
  const [chequing, setChequing] = useState(0);
  const [credit, setCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [chatID, setChatID] = useState(null);
  const [chatData, setChatData] = useState([
    {
      messageId: "00_1",
      from: "Sammy",
      to: "user",
      content: "Hello, I am Sammy. How may I help you?",
    },
  ]);
  const userEmail = localStorage.getItem("email");

  const openChat = () => {
    setShowSidebar(!showSidebar);

    let ChatHis = localStorage.getItem("chatID");
    console.log("ChatHis", ChatHis);
    console.log("showSidebar", showSidebar);

    if (showSidebar === false && ChatHis !== null) {
      console.log("Load History");
    } else if (showSidebar === false && chatID === null) {
      setChatID(uuidv4());
      localStorage.setItem("chatID", chatID);
      console.log("Created ID");
    } else {
      setChatID(null);
      localStorage.removeItem("chatID");
      console.log("Remove chatID");
    }
  };

  const sentMsg = async () => {
    let content = document.getElementById("msgInput").value;
    let msg = {
      messageId: chatID,
      from: userEmail,
      to: "Sammy",
      content: String(content).trim(),
    };

    console.log(msg);

    const response = await axios.post(`${baseURL}/chat`, msg);

    const userData = response.data;
    console.log(userData);
    setChatData([...chatData, msg, userData]);
  };

  const getChatdate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = new Date();
    let date = today.getDate();
    let month = months[today.getMonth()];
    return `${date} ${month}`;
  };

  useEffect(() => {
    const fetchInitdata = async () => {
      const response = await axios.post(`${baseURL}/getUserdata`, {
        email: userEmail,
      });

      const userData = response.data["payLoad"];
      setSavings(userData["savings"]);
      setChequing(userData["chequing"]);
      setCredit(userData["credit"]);
      setCreditLimit(userData["creditLimit"]);
    };

    fetchInitdata();

    localStorage.removeItem("chatID");
  }, [userEmail]);

  // User
  //   <div className="message me mb-4 flex text-right">
  //   <div className="flex-1 px-2">
  //     <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
  //       <span>I accept. Thank you very much.</span>
  //     </div>
  //     <div className="pr-4">
  //       <small className="text-gray-500">15 April</small>
  //     </div>
  //   </div>
  // </div>

  // Bot
  //   <div className="message mb-4 flex">
  //   <div className="flex-2">
  //     <div className="w-10 h-12 relative">
  //       <span className="w-10 h-12 rounded-full mx-auto">
  //         <svg
  //           viewBox="0 0 640 512"
  //           className=" fill-[#6c63ff] w-7 h-7"
  //         >
  //           <path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
  //         </svg>
  //       </span>
  //     </div>
  //   </div>
  //   <div className="flex-1 px-2">
  //     <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
  //       <span>
  //         All travel expenses are covered by us of course :D
  //       </span>
  //     </div>
  //     <div className="pl-4">
  //       <small className="text-gray-500">15 April</small>
  //     </div>
  //   </div>
  // </div>

  // Chat Footer
  // <div className="absolute grid w-5 h-5 place-items-center top-2/4 right-3 -translate-y-2/4 cursor-pointer group-focus-within:hidden">
  //                 <svg viewBox="0 0 512 512" className=" fill-[#6c63ff]">
  //                   <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
  //                 </svg>
  //               </div>
  //               <div className="absolute hidden w-5 h-5 place-items-center top-2/4 right-3 -translate-y-2/4 cursor-pointer group-focus-within:grid">
  //                 <svg viewBox="0 0 384 512" className=" fill-[#6c63ff]">
  //                   <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
  //                 </svg>
  //               </div>

  //const userRequest = "transfer 5000 from savings to reghu@gmail.com";

  // // Extract the amount using regex
  // const amountMatch = userRequest.match(/(\d+)/);
  // const amount = amountMatch ? parseInt(amountMatch[1]) : null;

  // // Extract the source account using regex
  // const sourceAccountMatch = userRequest.match(/from (\w+)/);
  // const sourceAccount = sourceAccountMatch ? sourceAccountMatch[1] : null;

  // // Extract the recipient email using regex
  // const recipientMatch = userRequest.match(/to (\S+)/);
  // const recipientEmail = recipientMatch ? recipientMatch[1] : null;

  // console.log(`Amount to transfer: $${amount}`);
  // console.log(`Source account: ${sourceAccount}`);
  // console.log(`Recipient email: ${recipientEmail}`);

  return (
    <div className=" relative w-full sm:h-screen overflow-hidden select-none flex">
      <div className=" w-32 h-full flex flex-col bg-[#6c63ff] justify-start">
        {/* ICON */}
        <div className=" flex justify-center p-1 my-9">
          <svg viewBox="0 0 512 512" className=" fill-[#FAFAFF] w-8 h-8">
            <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </div>
        {/* MENU */}
        <div className=" mt-2">
          <ul className="space-y-5 pl-2">
            <li className=" pl-2">
              <div className=" flex flex-col justify-center items-center p-1 rounded-l-xl bg-[#FAFAFF]">
                <svg viewBox="0 0 576 512" className=" fill-[#272D2D] w-8 h-8">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                <label className=" text-[#272D2D] font-semibold text-sm">
                  Home
                </label>
              </div>
            </li>
            <li className=" pl-2">
              <div className=" flex flex-col justify-center items-center p-1 rounded-lg">
                <svg viewBox="0 0 640 512" className=" fill-[#FAFAFF] w-8 h-8">
                  <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
                </svg>
                <label className=" text-[#FAFAFF] font-semibold text-sm">
                  Move Money
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className=" flex flex-col w-full h-full px-2 bg-[#FAFAFF]">
        <div className=" flex h-16 px-2 py-1 mt-9 border-b-2 border-[#272D2D] justify-between">
          <h1 className=" ml-5 my-auto font-bold text-xl">My Account</h1>
          <div className=" bg-[#272D2D] rounded-full w-11 h-11 flex justify-center items-center p-1 mr-5 cursor-pointer">
            <svg
              viewBox="0 0 448 512"
              className=" fill-[#FAFAFF] w-6 h-6"
              onClick={() => {
                setprofileDropDown(!profileDropDown);
              }}
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              {/* <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /> */}
            </svg>
            {/* DROPDOWN */}
            {profileDropDown && (
              <ul
                role="menu"
                data-popover="profile-menu"
                data-popover-placement="bottom"
                className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none top-24 right-3"
              >
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    My Profile
                  </p>
                </button>
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    Edit Profile
                  </p>
                </button>
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H2ZM2 2H12V9H10L9 11H5L4 9H2V2Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    Inbox
                  </p>
                </button>
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14 8C14 8.993 13.759 9.929 13.332 10.754L11.808 9.229C12.0362 8.52269 12.0632 7.76679 11.886 7.046L13.448 5.484C13.802 6.249 14 7.1 14 8ZM8.835 11.913L10.415 13.493C9.654 13.8281 8.83149 14.0007 8 14C7.13118 14.0011 6.27257 13.8127 5.484 13.448L7.046 11.886C7.63267 12.0298 8.24426 12.039 8.835 11.913ZM4.158 9.117C3.96121 8.4394 3.94707 7.72182 4.117 7.037L4.037 7.117L2.507 5.584C2.1718 6.34531 1.99913 7.16817 2 8C2 8.954 2.223 9.856 2.619 10.657L4.159 9.117H4.158ZM5.246 2.667C6.09722 2.22702 7.04179 1.99825 8 2C8.954 2 9.856 2.223 10.657 2.619L9.117 4.159C8.34926 3.93538 7.53214 3.94687 6.771 4.192L5.246 2.668V2.667ZM10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    Help
                  </p>
                </button>
                <hr className="my-2 border-blue-gray-50" role="menuitem" />
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    Sign Out
                  </p>
                </button>
              </ul>
            )}
          </div>
        </div>
        <div className="h-full flex p-1 relative">
          {/* CONTENT */}
          <div className="min-w-[40%]  w-[75%] flex flex-col justify-start relative space-y-4 pt-10 pl-5 h-full">
            {/* SAVINGS */}
            <div className=" w-full max-w-lg rounded-xl bg-[#ffffff] flex flex-col p-4 shadow-md">
              <div className=" flex justify-between">
                <div className=" w-fit flex">
                  <svg
                    viewBox="0 0 576 512"
                    className=" fill-[#6c63ff] w-6 h-6"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                  </svg>
                  <h1 className=" ml-2 font-bold text-xl">Banking</h1>
                </div>
                <div className=" w-fit flex space-x-1">
                  <span>Total Balance</span>
                  <h1 className=" ml-2 font-bold text-xl">{`$${parseFloat(
                    chequing + savings
                  ).toFixed(2)}`}</h1>
                  <span>CAD</span>
                </div>
              </div>
              <div className=" mt-2">
                <ul className=" bg-[#EDF5FC] rounded-lg p-2">
                  <li className=" flex justify-between items-center border-b-2 border-[#272D2D]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Momentum Advantage
                      </span>
                      <span className=" font-light text-sm">Chequing</span>
                    </div>
                    <div className=" font-semibold text-xl">{`$${parseFloat(
                      chequing
                    ).toFixed(2)}`}</div>
                  </li>
                  <li className=" flex justify-between items-center border-b-2 border-[#272D2D]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Savings PLUS
                      </span>
                      <span className=" font-light text-sm">Savings</span>
                    </div>
                    <div className=" font-semibold text-xl">{`$${parseFloat(
                      savings
                    ).toFixed(2)}`}</div>
                  </li>
                </ul>
              </div>
            </div>
            {/* CREDIT */}
            <div className=" w-full max-w-lg rounded-xl bg-[#ffffff] flex flex-col p-4 shadow-md">
              <div className=" flex justify-between">
                <div className=" w-fit flex">
                  <svg
                    viewBox="0 0 576 512"
                    className=" fill-[#272D2D] w-6 h-6"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                  </svg>
                  <h1 className=" ml-2 font-bold text-xl">Credit Cards</h1>
                </div>
                <div className=" w-fit flex space-x-1">
                  <span>Total Spent</span>
                  <h1 className=" ml-2 font-bold text-xl">{`$${parseFloat(
                    creditLimit - credit
                  ).toFixed(2)}`}</h1>
                  <span>CAD</span>
                </div>
              </div>
              <div className=" mt-2">
                <ul className=" bg-[#EDF5FC] rounded-lg p-2">
                  <li className=" flex justify-between items-center border-b-2 border-[#272D2D]">
                    <div className=" flex flex-col justify-center">
                      <span className=" font-semibold text-lg">
                        Snap Visa PLUS
                      </span>
                      <span className=" font-light text-sm">Visa</span>
                    </div>
                    <div className=" font-semibold text-xl">{`$${parseFloat(
                      credit
                    ).toFixed(2)}`}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* SIDE INFO */}
          <div className=" min-w-[280px] max-w-[400px] flex flex-col justify-start pr-5">
            <div className="flex flex-col mt-10 bg-[#ffffff] rounded-xl p-2 shadow-md">
              <div className=" flex p-1 border-b-2 border-[#272D2D]">
                <h1 className="my-auto font-bold text-xl">MY BALANCES</h1>
              </div>

              <div className=" flex justify-start py-1 px-4">
                <div className=" flex flex-col w-[45%] items-start">
                  <div className=" flex items-center justify-around space-x-2">
                    <span className=" bg-[#6c63ff] h-2 w-2 rounded-xl"></span>
                    <span>I have</span>
                  </div>
                  <span className=" font-semibold text-xl">{`$${parseFloat(
                    chequing + savings
                  ).toFixed(2)}`}</span>
                </div>
                <div className=" flex flex-col w-[45%] items-start">
                  <div className=" flex items-center justify-around space-x-2">
                    <span className=" bg-[#272D2D] h-2 w-2 rounded-xl"></span>
                    <span>I own</span>
                  </div>
                  <span className=" font-semibold text-lg">{`$${parseFloat(
                    creditLimit - credit
                  ).toFixed(2)}`}</span>
                </div>
              </div>
              <div className=" flex justify-around bg-[#EDF5FC] rounded-lg p-1">
                <span>Total Balance</span>
                <span className=" font-semibold text-lg">{`$${parseFloat(
                  chequing + savings + (creditLimit - credit)
                ).toFixed(2)}`}</span>
              </div>
            </div>
          </div>
          {/* CHAT ICON */}
          {!showSidebar && (
            <div
              className=" fixed bottom-5 right-7 bg-[#272D2D] h-16 w-16 rounded-full flex p-1 animate-bounce shadow-md cursor-pointer justify-center items-center"
              onClick={() => openChat()}
            >
              <svg viewBox="0 0 640 512" className=" fill-[#6c63ff] w-12 h-12">
                <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
              </svg>
            </div>
          )}
          {/* CHAT */}
          <div
            className={` flex flex-col right-0 min-w-[300px] bg-[#ffffff] py-8 px-5 transition-all duration-500 transform relative h-[85%] ml-2 rounded-md justify-between shadow-sm ${
              showSidebar ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            {/* CHAT HEADER */}
            <div className=" flex w-full justify-center relative mb-3">
              <h2 className=" text-lg font-semibold mr-2">Chat with Sammy</h2>
              <svg viewBox="0 0 640 512" className=" fill-[#6c63ff] w-7 h-7">
                <path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
              </svg>
              <span
                className=" absolute right-2 top-0 w-8 h-8 rounded-full cursor-pointer bg-[#FEECEB] flex justify-center items-center"
                onClick={() => openChat()}
              >
                {/* <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#F44336] z-0"></span> */}
                <svg
                  viewBox="0 0 384 512"
                  className=" fill-[#F44336] w-5 h-5 z-10"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </div>

            {/* CHAT SECTION */}
            <div className="messages relative flex-1 h-96 overflow-auto py-2">
              {chatData.map((chat, index) => {
                if (chat["from"] === "Sammy") {
                  return (
                    <div className="message mb-4 flex" key={index}>
                      <div className="flex-2">
                        <div className="w-10 h-12 relative">
                          <span className="w-10 h-12 rounded-full mx-auto">
                            <svg
                              viewBox="0 0 640 512"
                              className=" fill-[#6c63ff] w-7 h-7"
                            >
                              <path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="inline-block bg-gray-300 rounded-lg p-2 px-6 text-gray-700 text-justify">
                          {/* <span>{chat["content"]}</span> */}
                          {chat["content"]}
                        </div>
                        <div className="pl-4">
                          <small className="text-gray-500">
                            {getChatdate()}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="message me mb-4 flex text-right"
                      key={index}
                    >
                      <div className="flex-1 px-2">
                        <div className="inline-block bg-blue-600 rounded-lg p-2 px-6 text-white text-justify">
                          {/* <span>{chat["content"]}</span> */}
                          {chat["content"]}
                        </div>
                        <div className="pr-4">
                          <small className="text-gray-500">
                            {getChatdate()}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {/* CHAT FOOTER */}
            <div className="w-full mt-3">
              <div className="relative w-full h-10 group">
                <input
                  id="msgInput"
                  className="peer w-full h-full bg-transparent font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-[#272D2D] placeholder-shown:border-t-[#272D2D] border focus:border-2 border-t-transparent focus:border-t-transparent px-3 py-2.5 rounded-[7px] !pr-9 border-[#272D2D] focus:border-[#272D2D]"
                  placeholder=" "
                />
                <div
                  className="absolute grid w-5 h-5 place-items-center top-2/4 right-3 -translate-y-2/4 cursor-pointer"
                  onClick={() => {
                    sentMsg();
                  }}
                >
                  <svg viewBox="0 0 512 512" className=" fill-[#6c63ff]">
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                  </svg>
                </div>
                <div className="absolute hidden w-5 h-5 place-items-center top-2/4 right-3 -translate-y-2/4 cursor-pointer group-focus-within:hidden">
                  <svg viewBox="0 0 384 512" className=" fill-[#6c63ff]">
                    <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
                  </svg>
                </div>
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-[#272D2D] peer-focus:before:!border-[#272D2D] after:border-[#272D2D] peer-focus:after:!border-[#272D2D] !font-semibold">
                  Chat
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
