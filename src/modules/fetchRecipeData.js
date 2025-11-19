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

const data = await fetchData(
  `REMOVED/REMOVED/recipes/637c639a-1d94-43be-a347-8076dd69eb82`,
);

const recipes = data.recipes;

export default recipes;
