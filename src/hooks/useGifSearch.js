import { useState, useEffect } from 'react';
import axios from 'axios';

const useGifSearch = (keyword, offset, data) => {
  const [gifs, setGifs] = useState([]);
  const [error, setError] = useState(false);
  const [totalGifsCount, setTotalGifsCount] = useState(false);

  // reset gifs and totalGifsCount array if keyword has changed
  useEffect(() => {
    setGifs([]);
    setTotalGifsCount(false);
  }, [keyword]);

  // request
  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=NIC2mM6UGbGBO2GKMN0rpf1d5PHffluH&q=${keyword}&limit=12&offset=${offset}&rating=g&lang=en`
      )
      .then((res) => {
        !totalGifsCount && setTotalGifsCount(res.data.pagination.total_count); // set total gifs count
        res.data.data.forEach((item) => {
          setGifs((prevGifs) => {
            return [...prevGifs, item.images.original.url];
          });
        });
      })
      .catch((error) => {
        setError(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, offset]);
  return { gifs, error, totalGifsCount };
};

export default useGifSearch;
