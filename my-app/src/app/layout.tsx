import React from "react";
import Navbar from "../app/components/Navbar";
import Sidebar from "../app/components/Sidebar";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />
        <div className="main-content">
          {children} {/* Render the content of the current route */}
        </div>
      </body>
    </html>
  );
};

export default Layout;