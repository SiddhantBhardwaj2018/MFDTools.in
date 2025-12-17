import React from 'react';
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

const NavBar = () => {

  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);  

  return (
     <nav  className="border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {user ? (
              <li>
                <Link
                  href={"#"}
                  onClick={logout}
                  className="text-lg font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar