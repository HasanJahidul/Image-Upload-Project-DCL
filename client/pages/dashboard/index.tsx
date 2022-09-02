/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { jsxService } from "../../service";
import { IImg } from "../../types";
import Nav from "../../component/nav";
import Modal from "../../component/modal/inedx"
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "../../consts";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const getUrlFileExtension = (url: string) => {
    return new URL(url).pathname.substring(
      new URL(url).pathname.lastIndexOf(".") + 1
    );
  };
  const router = useRouter();
  const { tokenRefreshed, user } = useAuth();
  console.log(user, tokenRefreshed);
  const [img, setimg] = useState<
    undefined | null | { id: number; path: string }
  >(undefined);

  const handleLogoutCLick = async () => {
    removeCookies(ACCESS_TOKEN_COOKIE_KEY);
    removeCookies(REFRESH_TOKEN_COOKIE_KEY);
    router.replace(`/auth/login`);
  };

  useEffect(() => {
    jsxService()
      .get(`/img/getImgById/${user?.id}`)
      .then((res) => res.data)
      .then(setimg)
      .catch((err) => {
        console.log({ err });
        setimg(null);
      });
  }, [user?.id]);
  console.log(img);

  if (user === null) {
    router.replace(`/auth/login`); // null means error, redirect to login
  } else {
    if (!user) {
      return <h1>Loading....</h1>; // undefined means loading current-user
    } else {
      return (
        <>
          <div className="w-screen h-screen mx-auto  lg:px-0 bg-gradient-to-br from-purple-700 to-amber-700">
            <div className=" bg-white w-screen h-12 pt-0 flex justify-center items-center">
              <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setShowModal(true)}>
                Button
              </button>
              <h1>name: {user.name}</h1>
              <button
                className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={handleLogoutCLick}
              >
                Log Out
              </button>
            </div>
            <div className="py-8 px-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {/* // <Imgs p={p} /> */}
              {img?.map((im) => (
                <div key={im.id} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img src={im.path} className="group-hover:opacity-75" />
                  </div>
                </div>
              ))}
            </div>
            <Modal setShow={setShowModal} showModal={showModal}></Modal>
          </div>
        </>
      );
    }
  }
};

export default Dashboard;
