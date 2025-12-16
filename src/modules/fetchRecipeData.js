const APIUrl = 'REMOVED';
const teamId = 'REMOVED';

export const allRecipesEndpoint = `${APIUrl}/${teamId}/recipes`
export const allCategoriesEndpoint = `${APIUrl}/${teamId}/categories`


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