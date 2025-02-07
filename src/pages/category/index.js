import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/Category.module.scss';
import filterStyles from '../../styles/Filter.module.scss';
import searchStyles from '../../styles/Search.module.scss';
import { useRouter } from 'next/router';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  // Yemeklerin olduğu bölümü takip etmek için bir ref oluşturduk
  const mealsRef = useRef(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategories(data.categories));

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchMeals = async () => {
        let allMeals = [];
        for (let category of selectedCategories) {
          try {
            const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            allMeals = [...allMeals, ...(data.meals || [])];
          } catch (error) {
            console.error(`API isteği başarısız: ${error.message}`);
          }
        }
        setMeals(allMeals);

        // Yemekler yüklendikten sonra ekrana kaydır
        setTimeout(() => {
          if (mealsRef.current) {
            mealsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      };
      fetchMeals();
    } else {
      setMeals([]);
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(res => res.json())
        .then(data => setMeals(data?.meals || []));
    } else {
      setMeals([]);
    }
  }, [searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => 
      prevSelected.includes(category) 
        ? prevSelected.filter((c) => c !== category) 
        : [...prevSelected, category]
    );
  };

  const getRandomMeal = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        router.push(`/recipe/${data.meals[0].idMeal}`);
      }
    } catch (error) {
      console.error("Rastgele yemek getirilemedi:", error);
    }
  };

  const toggleFavorite = (meal) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.idMeal === meal.idMeal)) {
      updatedFavorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);
    } else {
      updatedFavorites = [...favorites, meal];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Head>
        <title>Yemek Kategorileri | Lezzetli Tarifler</title>
      </Head>

      <div className={styles.categoryContainer}>
        <h1 className={styles.title}>🍽️ Yemek Kategorileri</h1>

        <button className={styles.randomMealButton} onClick={getRandomMeal}>
          🎲 Rastgele Yemek Getir
        </button>

        <div className={filterStyles.categoryGrid}>
          {categories.map(category => (
            <div 
              key={category.idCategory} 
              className={`${filterStyles.categoryCard} ${selectedCategories.includes(category.strCategory) ? filterStyles.selected : ''}`}
              onClick={() => handleCategoryChange(category.strCategory)}
            >
              <Image 
                src={category.strCategoryThumb} 
                alt={category.strCategory} 
                width={80} 
                height={80} 
                className={filterStyles.categoryImage}
              />
              <h3>{category.strCategory}</h3>
              <p className={filterStyles.categoryDescription}>{category.strCategoryDescription.substring(0, 60)}...</p>
            </div>
          ))}
        </div>

        <div className={searchStyles.searchContainer}>
          <input
            type="text"
            placeholder="Yemek Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Yemek Kartları Bölümü */}
        <div ref={mealsRef} className={styles.mealGrid}>
          {meals.length > 0 ? (
            meals.map(meal => (
              <div key={meal.idMeal} className={styles.mealCard}>
                <Link href={`/recipe/${meal.idMeal}`}>
                  <Image src={meal.strMealThumb} alt={meal.strMeal} width={250} height={180} className={styles.mealImage} />
                  <h3>{meal.strMeal}</h3>
                </Link>
                <button 
                  className={`${styles.favoriteButton} ${favorites.some(fav => fav.idMeal === meal.idMeal) ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(meal)}
                >
                  {favorites.some(fav => fav.idMeal === meal.idMeal) ? "★ Favorilerde" : "☆ Favoriye Ekle"}
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noMeals}>Kategori seçiniz veya arama yapınız.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
