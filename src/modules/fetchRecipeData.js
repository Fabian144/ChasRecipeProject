async function fetchAllRecipes() {
  try {
    const response = await fetch(
      'REMOVED/REMOVED/recipes',
    );
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

export { fetchAllRecipes };
