const API_KEY = "d2952fbd";
const BASE_URL = "https://www.omdbapi.com/";

const popularTitles = [
  "La La Land",
  "Attack on Titan",
  "Interstellar",
  "Harry Potter and the Goblet of Fire",
  "I Want to Eat Your Pancreas",
  "Wednesday",
  "The Dark Knight",
  "Stranger Things",
  "Breaking Bad",
  "F1 : The Movie",
  "Ghosted",
  "Iron Man",
  "Inception",
  "Fight Club",
  "The Shawshank Redemption",
  "Solo Leveling",
  "Spider-Man",
  "Dragon Ball Z",
  "Naruto: Shippuden",
  "Tenet",
  "Harry Potter and the Deathly Hallows: Part 1",
  "Naruto",
  "Oppenheimer",
  "Vinland Saga",
  "Demon Slayer: Kimetsu no Yaiba",
  "One Piece",
  "Squid Game",
  "Harry Potter and the Sorcerer's Stone",
  "Weathering with You",
  "Cars",
  "Avatar",
  "Titanic",
  "Jujutsu Kaisen",
  "Avengers",
  "Finding Nemo",
];



export const getPopularMovies = async () => {
  try {
    const results = await Promise.all(
      popularTitles.map((title) =>
        fetch(
          `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
        ).then((res) => res.json())
      )
    );

    return results.filter((movie) => movie.Response === "True");
  } catch (err) {
    throw err;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error || "No movies found");
    }
  } catch (err) {
    throw err;
  }
};


export const getMovieById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error || "Movie not found");
    }
  } catch (err) {
    throw err;
  }
};
