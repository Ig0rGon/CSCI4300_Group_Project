import React from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main-content">
        <SessionProvider>
          {children} {/* Render the content of the current route */}
        </SessionProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;