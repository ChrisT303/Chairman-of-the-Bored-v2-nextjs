import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import Link from "next/link";
import { HiChevronDoubleDown, HiXCircle } from "react-icons/hi";
import { FcBusinessman } from "react-icons/fc";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { user, logout } = useContext(AuthContext);


  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);
  }, []);

  const onClick = () => setActive(!active);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const ModalSwitchHandler = () => {
    setIsLogin(!isLogin);
  };

  const userLogout = () => {
    logout();
  };

  return (
    <div className="content-start flex flex-col h-[80px]">
      {showModal &&
        (isLogin ? (
          <LoginModal
            onShowModal={modalHandler}
            SwitchModal={ModalSwitchHandler}
          />
        ) : (
          <RegisterModal
            onShowModal={modalHandler}
            SwitchModal={ModalSwitchHandler}
          />
        ))}
      <div className="fixed w-full h-[80px] flex justify-between items-center px-6 bg-yellow-300 text-white font-bold z-20">
        <div className="flex text-2xl text-rose-600 text-center">
          Chairman of the Bored
          <span>
            <FcBusinessman size={40} className="inline-flex ml-4" />
          </span>
        </div>
        <nav className="hidden md:flex md:space-x-4 text-rose-600">
          <ul className="flex items-center space-x-4">
            <li className="hover:text-sky-400">
            <Link href="/"><span className="cursor-pointer">Home</span></Link>
            </li>
            <li className="hover:text-sky-400">
            <Link href="/leaderboard"><span className="cursor-pointer">Leaderboard</span></Link>
            </li>
            <li className="hover:text-sky-400">
            <Link href="/about"><span className="cursor-pointer">About</span></Link>
            </li>
            {authReady && user ? (
            <>
              <li className="hover:text-sky-400">
                <Link href="/profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="hover:text-sky-400">
                <a onClick={userLogout}>Logout</a>
              </li>
            </>
          ) : (
            <li className="hover:text-sky-400">
              <a onClick={() => setShowModal(true)}>Login/Signup</a>
            </li>
          )}
          </ul>
        </nav>
        <div
          onClick={onClick}
          className="md:hidden text-rose-600 hover:text-sky-400"
        >
          {!active ? <HiChevronDoubleDown /> : <HiXCircle />}
        </div>

        <div
          className={
            !active
              ? "hidden"
              : "w-full h-screen main flex flex-col md:hidden justify-center items-center bg-girl bg-cover bg-no-repeat bg-center md:bg-none text-black absolute inset-0 z-30"
          }
        >
      <ul className="flex flex-col items-center">
  <li className="py-6 text-4xl hover:text-sky-400" onClick={onClick}>
    <Link href="/">
      <span className="cursor-pointer">Home</span>
    </Link>
  </li>
  {authReady && user ? (
            <>
              <li className="hover:text-sky-400">
                <Link href="/profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="hover:text-sky-400">
                <a onClick={userLogout}>Logout</a>
              </li>
            </>
          ) : (
            <li className="hover:text-sky-400">
              <a onClick={() => setShowModal(true)}>Login/Signup</a>
            </li>
          )}
  <li className="py-6 text-4xl hover:text-sky-400" onClick={onClick}>
    <Link href="/leaderboard">
      <span className="cursor-pointer">Leaderboard</span>
    </Link>
  </li>
  <li className="py-6 text-4xl hover:text-sky-400" onClick={onClick}>
    <Link href="/about">
      <span className="cursor-pointer">About</span>
    </Link>
  </li>
</ul>

        </div>
      </div>
    </div>
  );

};

export default NavBar;



