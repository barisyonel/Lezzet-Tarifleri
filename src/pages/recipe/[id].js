import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Recipe.module.scss';
import { jsPDF } from 'jspdf';

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.meals[0]));
    }
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(recipe.strMeal, 10, 10);
    doc.text(recipe.strInstructions, 10, 20, { maxWidth: 180 });
    doc.save(`${recipe.strMeal}.pdf`);
  };

  if (!recipe) return <p className={styles.loading}>Yükleniyor...</p>;

  return (
    <>
      <Head>
        <title>{recipe.strMeal} Tarifi | Yemek Tarifi Sitesi</title>
        <meta name="description" content={`${recipe.strMeal} tarifi için malzemeler ve yapılış adımları. PDF olarak indirebilirsiniz.`} />
        <meta property="og:image" content={recipe.strMealThumb} />
      </Head>

      <div className={styles.recipeContainer}>
        <h1>{recipe.strMeal}</h1>
        <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={800} height={400} />
        <p>{recipe.strInstructions}</p>

        <button onClick={downloadPDF} className={styles.pdfButton}>
          📥 Tarifi PDF Olarak İndir
        </button>
      </div>
    </>
  );
};

export default RecipeDetail;
