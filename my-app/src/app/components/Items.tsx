"use client"

import React, { use } from 'react';
import Image from 'next/image';
import styles from '../styles/Items.module.css';
import "../styles/Items.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


//Interface for each item
interface Item {
  _id: string;
  name: string;
  price: number;
  location: string;
  lat: number;
  lon: number;
  imageUrl: string;
  category: string;
}

//Interface for all items
interface ItemsProps {
  items: Item[];
}


//takes all the items and prints out in a neat card
// Currently only shows image, price, name, and location
// Finer details will be shown when item is clicked
const Items: React.FC<ItemsProps> = ({ items }) => {

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or <p>Loading...</p>

  const handleClick = (id: string, name: string, category: string) => {
    window.location.href = `/items/${id}`; //This hard resets the page and fixes styling errors
}

  

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (
        //This Div holds the image and the item details 
        <div onClick={() => handleClick(item._id, item.name, item.category)} key={item._id} className={styles.itemCard} style={{ cursor: "pointer" }}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={150}
            height={150}
            className={styles.itemImage}
          />
          <div className={styles.itemDetails}>
            <h1>${item.price.toFixed(2)}</h1>
            <p>{item.name}</p>
            <p>{item.location}</p>
          </div>
        </div>
      
      ))}
    </div>
  );
};

export default Items;
