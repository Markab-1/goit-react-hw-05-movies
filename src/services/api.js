const apiKey = '933eb3a4e274b288a58d48cbb1a686ce';
const baseUrl = 'https://api.themoviedb.org/3/';

export default function fetchAllMovies(getStr, searchStr) {
  const resUrl = baseUrl + getStr + '?api_key=' + apiKey + searchStr;
  console.log(resUrl);
  return fetch(resUrl).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error('Something wrong happened'));
    }
    return res.json();
  });
}
