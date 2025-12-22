import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Login from "../../components/Login";
import Register from "../../components/Register";
import AuthContext from '../../context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  const { checkUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkUserLoggedIn();
    const role = localStorage.getItem("role");
    if (role !== null) {
      if (role === "ROLE_BASIC_USER") {
        router.push("/panel");
      } else if (role === "ROLE_STUDENT") {
        router.push("/admin");
      }
    }else{
      router.push("/");
    }
  },[])
  
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="flex flex-row">
        <Register />
        <Login />
      </div>
    </div>
  );
}
