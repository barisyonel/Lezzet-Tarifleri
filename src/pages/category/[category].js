import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/CategoryDetail.module.scss';

const CategoryDetail = () => {
  const router = useRouter();
  const { category } = router.query; // URL'den kategori ismini alıyoruz
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals));
    }
  }, [category]);

  return (
    <div className={styles.container}>
      <h1>{category} Yemekleri</h1>
      <div className={styles.mealGrid}>
        {meals.map((meal) => (
          <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`}>
            <div className={styles.mealCard}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
