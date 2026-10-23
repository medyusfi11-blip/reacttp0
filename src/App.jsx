import { useState } from "react";
import "./App.css";

const initialRecipes = [
  {
    id: 1,
    name: "Pizza Margherita",
    category: "Plat",
    ingredients: ["Farine", "Tomate", "Mozzarella", "Basilic"],
    difficulty: 2,
    description: "Une pizza italienne classique et délicieuse.",
    image: "",
  },
  {
    id: 2,
    name: "Salade César",
    category: "Entrée",
    ingredients: ["Salade", "Poulet", "Parmesan", "Sauce César"],
    difficulty: 2,
    description: "Une salade fraîche et savoureuse.",
    image: "",
  },
  {
    id: 3,
    name: "Gâteau au chocolat",
    category: "Dessert",
    ingredients: ["Chocolat", "Farine", "Sucre", "Œufs"],
    difficulty: 3,
    description: "Un délicieux gâteau au chocolat.",
    image: "",
  },
  {
    id: 4,
    name: "Jus d'orange",
    category: "Boisson",
    ingredients: ["Oranges", "Eau", "Sucre"],
    difficulty: 1,
    description: "Un jus d'orange frais et naturel.",
    image: "",
  },
];

function RecipeItem({ recipe, onEdit, onDuplicate, onDelete }) {
  return (
    <article className="recipe-card">
      {recipe.image ? (
        <img
          className="recipe-image"
          src={recipe.image}
          alt={recipe.name}
        />
      ) : (
        <div className="recipe-placeholder">🍽️</div>
      )}

      <div className="recipe-content">
        <h2>{recipe.name}</h2>

        <span className="category-badge">{recipe.category}</span>

        <h4>Ingrédients :</h4>

        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <p>
          <strong>Difficulté :</strong>{" "}
          {"⭐".repeat(recipe.difficulty)}
          {"☆".repeat(5 - recipe.difficulty)}
        </p>

        <p className="recipe-description">
          {recipe.description || "Aucune description."}
        </p>

        <div className="recipe-actions">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(recipe)}
          >
            ✏️ Modifier
          </button>

          <button
            className="btn btn-duplicate"
            onClick={() => onDuplicate(recipe)}
          >
            📋 Dupliquer
          </button>

          <button
            className="btn btn-delete"
            onClick={() => onDelete(recipe.id)}
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}

function RecipeForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(
    initialData?.category || "Entrée"
  );
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients || [""]
  );
  const [difficulty, setDifficulty] = useState(
    initialData?.difficulty || 1
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function removeIngredient(indexToDelete) {
    setIngredients(
      ingredients.filter((_, index) => index !== indexToDelete)
    );
  }

  function changeIngredient(indexToChange, value) {
    setIngredients(
      ingredients.map((ingredient, index) =>
        index === indexToChange ? value : ingredient
      )
    );
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Veuillez saisir le nom de la recette.");
      return;
    }

    const validIngredients = ingredients
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient !== "");

    if (validIngredients.length === 0) {
      alert("Veuillez ajouter au moins un ingrédient.");
      return;
    }

    onSave({
      id: initialData?.id,
      name: name.trim(),
      category,
      ingredients: validIngredients,
      difficulty: Number(difficulty),
      description: description.trim(),
      image,
    });
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Modifier la recette" : "Nouvelle recette"}</h2>

      <label>Nom de la recette *</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Exemple : Pizza"
        required
      />

      <label>Catégorie</label>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Entrée">Entrée</option>
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Boisson">Boisson</option>
      </select>

      <label>Ingrédients</label>

      {ingredients.map((ingredient, index) => (
        <div className="ingredient-row" key={index}>
          <input
            type="text"
            value={ingredient}
            onChange={(event) =>
              changeIngredient(index, event.target.value)
            }
            placeholder={`Ingrédient ${index + 1}`}
          />

          <button
            type="button"
            className="btn btn-delete ingredient-delete"
            onClick={() => removeIngredient(index)}
            aria-label={`Supprimer l'ingrédient ${index + 1}`}
          >
            ✖
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-add-ingredient"
        onClick={addIngredient}
      >
        + Ajouter un ingrédient
      </button>

      <label>
        Difficulté : {difficulty}/5
      </label>

      <input
        type="range"
        min="1"
        max="5"
        value={difficulty}
        onChange={(event) => setDifficulty(event.target.value)}
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Décrivez votre recette..."
        rows="4"
      />

      <label>Image de la recette</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <img
          className="form-image-preview"
          src={image}
          alt="Aperçu de la recette"
        />
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-save">
          💾 Enregistrer
        </button>

        <button
          type="button"
          className="btn btn-cancel"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function RecipeFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="filter-container">
      <input
        type="search"
        placeholder="🔎 Rechercher une recette..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Toutes">Toutes les catégories</option>
        <option value="Entrée">Entrée</option>
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Boisson">Boisson</option>
      </select>
    </div>
  );
}

function RecipeList({ recipes, onEdit, onDuplicate, onDelete }) {
  if (recipes.length === 0) {
    return (
      <p className="empty-message">
        Aucune recette trouvée.
      </p>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function Aide() {
  const [open, setOpen] = useState(false);

  return (
    <section className="help-section">
      <button
        className="btn btn-help"
        onClick={() => setOpen(!open)}
      >
        ❓ Aide {open ? "▲" : "▼"}
      </button>

      {open && (
        <div className="help-content">
          <h3>Comment utiliser l'application ?</h3>

          <ul>
            <li>Cliquez sur « Nouvelle recette » pour ajouter une recette.</li>
            <li>Utilisez le formulaire pour saisir les informations.</li>
            <li>Cliquez sur « Modifier » pour changer une recette.</li>
            <li>Cliquez sur « Dupliquer » pour copier une recette.</li>
            <li>Cliquez sur « Supprimer » pour supprimer une recette.</li>
            <li>Utilisez la recherche et le filtre par catégorie.</li>
            <li>Utilisez la pagination pour naviguer entre les pages.</li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const recipesPerPage = 3;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesName = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Toutes" || recipe.category === category;

    return matchesName && matchesCategory;
  });

  const totalPages = Math.ceil(
    filteredRecipes.length / recipesPerPage
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * recipesPerPage;

  const currentRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  function handleSave(recipeData) {
    if (editingRecipe) {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === editingRecipe.id
            ? { ...recipeData, id: editingRecipe.id }
            : recipe
        )
      );
    } else {
      setRecipes([
        ...recipes,
        {
          ...recipeData,
          id: Date.now(),
        },
      ]);
      setCurrentPage(1);
    }

    setShowForm(false);
    setEditingRecipe(null);
  }

  function handleEdit(recipe) {
    setEditingRecipe(recipe);
    setShowForm(true);
  }

  function handleDuplicate(recipe) {
    const duplicatedRecipe = {
      ...recipe,
      id: Date.now(),
      name: recipe.name + " (Copie)",
      ingredients: [...recipe.ingredients],
    };

    setRecipes([...recipes, duplicatedRecipe]);
    setCurrentPage(1);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette recette ?"
    );

    if (confirmed) {
      setRecipes(
        recipes.filter((recipe) => recipe.id !== id)
      );
    }
  }

  function openNewForm() {
    setEditingRecipe(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingRecipe(null);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🍳 Creative Recipe Builder</h1>
        <p>Créez, gérez et découvrez vos recettes préférées.</p>
      </header>

      <main className="container">
        <div className="page-heading">
          <div>
            <h2>Mes recettes</h2>
            <p>
              Nombre total de recettes : <strong>{recipes.length}</strong>
            </p>
          </div>

          <button className="btn btn-primary" onClick={openNewForm}>
            + Nouvelle recette
          </button>
        </div>

        <RecipeFilter
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          category={category}
          setCategory={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
        />

        {showForm && (
          <div className="modal-overlay" onClick={closeForm}>
            <div
              className="modal-content"
              onClick={(event) => event.stopPropagation()}
            >
              <RecipeForm
                key={editingRecipe?.id || "new"}
                initialData={editingRecipe}
                onSave={handleSave}
                onCancel={closeForm}
              />
            </div>
          </div>
        )}

        <RecipeList
          recipes={currentRecipes}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-pagination"
              disabled={safePage === 1}
              onClick={() => setCurrentPage(safePage - 1)}
            >
              ← Précédent
            </button>

            <span>
              Page {safePage} / {totalPages}
            </span>

            <button
              className="btn btn-pagination"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage(safePage + 1)}
            >
              Suivant →
            </button>
          </div>
        )}

        <Aide />

        <footer className="footer">
          <p>Creative Recipe Builder — Projet React</p>
        </footer>
      </main>
    </div>
  );
}