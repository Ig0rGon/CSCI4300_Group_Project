import React from "react";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main-content">
          {children} {/* Render the content of the current route */}
        </div>
      </body>
    </html>
  );
};

export default Layout;
