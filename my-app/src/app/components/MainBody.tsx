 /* "use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use useSearchParams for query parameters
import "../styles/MainBody.css";
import Card from "./Card";

const MainBody = () => {
  const searchParams = useSearchParams(); // Access query parameters
  const [cards, setCards] = useState<
    { image: string; price: string; category: string; title: string; location: string }[]
  >([]);

  useEffect(() => {
    const image = searchParams.get("image");
    const price = searchParams.get("price");
    const category = searchParams.get("category");
    const title = searchParams.get("title");
    const location = searchParams.get("location");

    if (image && price && category && title && location) {
      const newCard = { image, price, category, title, location };
      setCards((prevCards) => [...prevCards, newCard]);
    }
  }, [searchParams]);

  return (
    <main className="main-body">
      <h1 className="main-title">Description</h1>
      <p className="main-description">
        We aim to provide a digital market square for all UGA students to facilitate interactions.
        Please browse through our categories to find what you need!
      </p>

      <div>
        <h1 className="main-title">Catalogue</h1>
        <h2>Athens, GA</h2>
      </div>

      <div className="card-container">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            image={card.image}
            price={card.price}
            category={card.category}
            description={card.title}
            location={card.location}
          />
        ))}
      </div>
    </main>
  );
};

export default MainBody;
*/