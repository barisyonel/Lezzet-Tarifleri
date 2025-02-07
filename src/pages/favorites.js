import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Favorites.module.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter(meal => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Head>
        <title>Favori Tariflerim</title>
      </Head>

      <div className={styles.favoritesContainer}>
        <h1 className={styles.title}>⭐ Favori Tariflerim</h1>

        {favorites.length === 0 ? (
          <p className={styles.noFavorites}>Henüz favori yemek eklenmedi.</p>
        ) : (
          <div className={styles.mealGrid}>
            {favorites.map(meal => (
              <div key={meal.idMeal} className={styles.mealCard}>
                <Link href={`/recipe/${meal.idMeal}`}>
                  <Image src={meal.strMealThumb} alt={meal.strMeal} width={250} height={180} className={styles.mealImage} />
                  <h3>{meal.strMeal}</h3>
                </Link>
                <button 
                  className={styles.removeButton} 
                  onClick={() => removeFavorite(meal.idMeal)}
                >
                  ❌ Favoriden Çıkar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
