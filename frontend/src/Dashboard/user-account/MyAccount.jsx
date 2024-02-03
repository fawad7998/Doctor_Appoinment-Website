import { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
// import userimg from "../../assets/images/doctor-img01.png";

import MyBooking from "./MyBooking";
import Profile from "./Profile";

import useFetchData from "../../hooks/useFetchData";
import { BASEURL } from "../../config";

import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userDate,
    loading,
    error,
  } = useFetchData(`${BASEURL}/users/profile/me`);

  const deleteAccount = () => {
    dispatch({ type: "DELETE_ACCOUNT" });
  };
  // console.log(userDate);

  const heandleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errorMessage={error} />}
        {!loading && !loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex felx-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userDate?.photo}
                    className="w-full h-full rounded-full"
                    alt="Doctor image"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold ">
                  {userDate.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userDate?.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blod Type:{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userDate?.bloodType}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={heandleLogout}
                  className="w-full bg-[#181a1e] p-3 text-[16px] left-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button
                  onClick={deleteAccount}
                  className="w-full bg-red-600 p-3 mt-4 text-[16px] left-7 rounded-md text-white"
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" && <MyBooking />}
              {tab === "settings" && <Profile user={userDate} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
