"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import Image from "next/image";
import "../styles/Navbar.css";
import { User } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/"); // Navigate to the home page
  };

  const handlePostItemClick = () => {
    router.push("/post-item"); // Navigate to the Post Item page
  };

  return (
    <nav className="Navbar">
      <div className="logo-container">
        <button onClick={handleLogoClick} className="logo-button">
          <Image src="/assets/logo.png" alt="Bulldog Market Logo" className="logo" width={50} height={50} />
        </button>
      </div>
      <div className="navbar-buttons">
        <button className="post-item-button" onClick={handlePostItemClick}>
          Post Item
        </button>
        <button className="sign-out-button">Sign Out</button>
        <button className="account-button">
          <User className="account-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;