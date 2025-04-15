"use client";

import React from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image"
import "./styles/Home.css";

export default function Home() {
  // const router = useRouter();

  const handleEnterSite = () => {
    // router.push("/main"); // Navigate to the original page.tsx (now at /main)
    window.location.href = "/main"; //This hard resets the page and fixes styling errors
  };

  return (
    <div className="home-container">
      {/* <button className="enter-button">
        Sign In
      </button> */}
      <Image src="/assets/logo.png" alt="Bulldog Market Logo" className="logo" width={200} height={200} />
      <h1>Welcome to Bulldog Market</h1>
      <p>
        Your one-stop shop for all your needs! We aim to be the ultimate online marketplace
        for all UGA students and the Athens community. Whether you're looking to buy, sell, or explore,
        out platform offers a seamless and secure experience for all your needs. 
        Join us today and start shopping!
      </p>
      <button onClick={handleEnterSite} className="enter-button">
        Begin Shopping!
      </button>
    </div>
  );
}