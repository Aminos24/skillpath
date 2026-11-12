
const BASE_URL = "https://ec.europa.eu/esco/api";

export async function searchOccupations(keyword) {
  const params = new URLSearchParams({
    text: keyword,
    type: "occupation",
    language: "en",
    limit: "5",
  });

  const response = await fetch(
    `${BASE_URL}/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `ESCO API request failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data._embedded?.results || [];
}
