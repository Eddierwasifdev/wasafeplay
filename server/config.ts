export const nowPlayingUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
export const topRatedUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const trendingUrl =
  "https://api.themoviedb.org/3/trending/all/day?language=en-US";

export const tvNowPlayingUrl =
  "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";

export const tvTopRatedUrl =
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

export const searchUrl = (debouncedSearch: string) =>
  `https://api.themoviedb.org/3/search/multi?query=${debouncedSearch}&include_adult=false&language=en-US&page=1`;

export const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;

export const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?language=en-US`;

export const fallbackImageUrl = "https://placehold.co/500x750?text=No+Image";

export const imageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const embedUrlMovie = (filmId: string) =>
  `https://vidsrc.xyz/embed/movie/${filmId}`;

export const embedUrlTv = (filmId: string, season: string, episode: string) =>
  `https://vidsrc.xyz/embed/tv?tmdb=${filmId}&season=${season}&episode=${episode}`;

export const filmInfoUrl = (isMovie: string, filmId: string) =>
  `https://api.themoviedb.org/3/${isMovie}/${filmId}?language=en-US`;

export const filmsGridUrlMovie = (pageNum: string) =>
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;

export const filmsGridUrlTv = (pageNum: string) =>
  `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;
