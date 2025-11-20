async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

const data = await fetchData(`../src/data/recept.json`);

const recipes = data.recipes;

export default recipes;

export async function fetchRecipe(id) {
  try {
    const response = await fetch(
      `REMOVED/REMOVED/recipes/${id}`,
    );
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
