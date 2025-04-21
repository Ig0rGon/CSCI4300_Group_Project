"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import Image from "next/image";
import "../styles/Navbar.css";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface navBar {
  onLogoClick: () => void;
}

const Navbar: React.FC<navBar> = ({ onLogoClick }) => {
  const router = useRouter();
  const { data: session, status } = useSession(); // 👈 check session
  const isLoggedIn = !!session; // 👈 true if session exists

  const handlePostItemClick = () => {
    router.push("/post-item"); // Navigate to the Post Item page
  };

  const handleSignUpClick = () => {
    window.location.href = "/sign-up";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleSignOutClick = () => {
    signOut({ callbackUrl: "/" }); // Redirect to homepage after signing out
  };

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
      {isLoggedIn && session?.user?.name && (
        <div className="ml-4">
          <p className="text-md text-red-700 font-semibold">
            Welcome, <span className="text-black">{session.user.name}</span>
          </p>
        </div>
      )}
      <div className="navbar-buttons">
        {isLoggedIn ? ( //If logged in render these buttons
          <>
            <button className="post-item-button" onClick={handlePostItemClick}>
              Post Item
            </button>
            <button className="sign-out-button" onClick={handleSignOutClick}>
              Sign Out
            </button>
            <button className="account-button">
              <User className="account-icon" />
            </button>
          </>
        ) : (
          //If logged out render these buttons
          <>
            <button className="sign-out-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
            <button className="post-item-button" onClick={handleLoginClick}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
