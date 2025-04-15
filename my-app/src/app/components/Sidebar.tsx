// COMPONENT: Sidebar.tsx
import React from "react";
import "../styles/Sidebar.css";
import { Home, Ticket, Book, ShoppingBag, Shirt, Monitor, PawPrint, CircleEllipsis } from "lucide-react";

const Sidebar = () => {
  const categories = [
    { name: "Tickets", icon: <Ticket /> },
    { name: "Household items", icon: <Home /> },
    { name: "School supplies", icon: <Book /> },
    { name: "Sporting goods", icon: <ShoppingBag /> },
    { name: "Clothing", icon: <Shirt /> },
    { name: "Electronics", icon: <Monitor /> },
    { name: "Pet Supplies", icon: <PawPrint /> },
    { name: "Other", icon: <CircleEllipsis /> }, // <-- New category
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Marketplace</div>
      <input type="text" placeholder="Search items" className="sidebar-search" />

{/* 
      <div className="sidebar-location">
        <p className="sidebar-location-title">Location</p>
        <a><p className="sidebar-location-value">Athens, Georgia</p></a>
      </div> */}

      
      <div className="sidebar-categories">
        <p className="sidebar-categories-title">Categories</p>
        <ul className="sidebar-categories-list">
          {categories.map((cat, idx) => (
            <li key={idx} className="sidebar-category-item">
              <button className="sidebar-category-button">
                <span className="sidebar-category-icon">{cat.icon}</span>
              </button>
              <span className="sidebar-category-name">{cat.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;