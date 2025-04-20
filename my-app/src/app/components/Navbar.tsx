"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import Image from "next/image";
import "../styles/Navbar.css";
import { User } from "lucide-react";

interface navBar {
  onLogoClick: () => void;
}

const Navbar: React.FC<navBar> = ({onLogoClick}) => {
  const router = useRouter();

  const handlePostItemClick = () => {
    router.push("/post-item"); // Navigate to the Post Item page
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };
  
  const isLoggedin = false;

  return (
    <nav className="Navbar">
      <div className="logo-container">
        <button onClick={onLogoClick} className="logo-button">
          <Image
            src="/assets/logo.png"
            alt="Bulldog Market Logo"
            className="logo"
            width={100}
            height={100}
          />
        </button>
      </div>
      <div className="navbar-buttons">
        {isLoggedin ? ( //If logged in render these buttons
          <>
            <button className="post-item-button" onClick={handlePostItemClick}>
              Post Item
            </button>
            <button className="sign-out-button" onClick={handleSignUpClick}>Sign Out</button>
            <button className="account-button">
              <User className="account-icon" />
            </button>
          </>
        ) : ( //If logged out render these buttons
          <>
            <button className="sign-out-button" onClick={handleSignUpClick}>Sign In</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
