import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { HiChevronDoubleDown, HiXCircle } from "react-icons/hi";
import { FcBusinessman } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

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
    navigate("/");
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
              <NavLink to="/" onClick={onClick} key="home">
                Home
              </NavLink>
            </li>
            {/* Add your desktop menu items here */}
            <li className="hover:text-sky-400">
              <NavLink
                to="/leaderboard"
                onClick={onClick}
                key="desktop-leaderboard"
              >
                Leaderboard
              </NavLink>
            </li>
            <li className="hover:text-sky-400">
              <NavLink to="/about" onClick={onClick} key="desktop-about">
                About
              </NavLink>
            </li>
            {authReady && user ? (
              <li className="hover:text-sky-400">
                <NavLink to="/" onClick={userLogout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="hover:text-sky-400">
                <NavLink to="/" onClick={() => setShowModal(true)}>
                  Login/Signup
                </NavLink>
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
            <li className="py-6 text-4xl hover:text-sky-400">
              <NavLink to="/" onClick={onClick} key="mobile-home">
                Home
              </NavLink>
            </li>
            {authReady && user ? (
              <li className="py-6 text-4xl hover:text-sky-400">
                <NavLink to="/" onClick={userLogout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="py-6 text-4xl hover:text-sky-400">
                <NavLink to="/" onClick={() => setShowModal(true)}>
                  Login/Signup
                </NavLink>
              </li>
            )}
            <li className="py-6 text-4xl hover:text-sky-400">
              <NavLink
                to="/leaderboard"
                onClick={onClick}
                key="mobile-leaderboard"
              >
                Leaderboard
              </NavLink>
            </li>

            <li className="py-6 text-4xl hover:text-sky-400">
              <NavLink to="/about" onClick={onClick} key="mobile-about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
