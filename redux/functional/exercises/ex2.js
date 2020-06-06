const recipe = {
  name: 'Spaghetti Bolognese',
  ingredients: ['egg', 'salt'],
};

// Assuming this object is immatable, write code to:
// - Add a new ingredient ("cream")
// - Replace "egg" with "egg white"
// - Remove an indredient ("egg")

const added = {
  ...recipe,
  ingredients: [...recipe.ingredients, 'cream'],
};

const updated = {
  ...recipe,
  ingredients: recipe.ingredients.map((i) => (i === 'egg' ? 'egg white' : i)),
};

const removed = {
  ...recipe,
  ingredients: recipe.ingredients.filter((i) => i !== 'egg'),
};

console.log(recipe);
console.log(added);
console.log(updated);
console.log(removed);
