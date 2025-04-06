import React from 'react';
import Image from 'next/image'; // Use this only if you're in a Next.js project
import styles from '../styles/Items.module.css';


//Interface for each item
interface Item {
  id: number;
  name: string;
  price: number;
  location: string;
  imageUrl: string;
}

//Interface for all items
interface ItemsProps {
  items: Item[];
}

//arrow function to handle whne Items is clicked
const handleClick = (id: number, name: string) => {
    alert(`Item ID: ${id} and Name: ${name}` + " clicked");
}

//takes all the items and prints out in a neat card
const Items: React.FC<ItemsProps> = ({ items }) => {
  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (
        //This Div holds the image and the item details 
        <div onClick={() => handleClick(item.id, item.name)}> 
          <div key={item.id} className={styles.itemCard}>
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
        </div>
      ))}
    </div>
  );
};

export default Items;
