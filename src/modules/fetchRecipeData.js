const teamId = 'REMOVED';
const APIUrl = 'REMOVED';

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

export const fetchAllRecipesGlobal = await fetch(`${APIUrl}/${teamId}/recipes`);

export const fetchRecipeGlobal = async function fetchRecipeGloball(recipeId) {
  return await fetch(`${APIUrl}/${teamId}/recipes/${recipeId}`);
}
