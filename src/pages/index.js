import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import styles from '../styles/Home.module.scss';

export async function getStaticProps() {
  const meals = [];
  for (let i = 0; i < 4; i++) {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    meals.push(data.meals[0]);
  }

  const categoryRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const categoryData = await categoryRes.json();
  
  return { 
    props: { randomMeals: meals, categories: categoryData.categories }, 
    revalidate: 3600 
  };
}

const Home = ({ randomMeals, categories }) => {
  return (
    <>
      <Head>
        <title>Yemek Tarifi Sitesi | En Lezzetli Tarifler</title>
        <meta name="description" content="Lezzetli yemek tariflerini keşfedin. En iyi yemekleri deneyin ve tarifleri PDF olarak indirin." />
      </Head>

      <HeroSection />

      <div className={styles.container}>
        <h1>Önerilen Yemekler</h1>
        <div className={styles.mealGrid}>
          {randomMeals.map((meal) => (
            <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`}>
              <div className={styles.mealCard}>
                <Image src={meal.strMealThumb} alt={meal.strMeal} width={300} height={200} />
                <h3>{meal.strMeal}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <h2>Popüler Kategoriler</h2>
        <div className={styles.categoryGrid}>
          {categories.slice(0, 6).map(category => (
            <Link key={category.idCategory} href={`/category/${category.strCategory}`}>
              <div className={styles.categoryCard}>
                <Image src={category.strCategoryThumb} alt={category.strCategory} width={200} height={150} />
                <h3>{category.strCategory}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
