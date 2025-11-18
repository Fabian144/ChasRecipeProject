async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

export async function getRecipes() {
	const data = await fetchData(`/src/data/recept.json`); //blev tvungen att ändra path.
	return data.recipes;
}

const recipes = await getRecipes();

export default recipes;