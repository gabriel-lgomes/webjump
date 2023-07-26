import { useState, useEffect } from "react";

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      setIsLoading(true);
      
      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch(error) {
        setError(error.message)
      }
  
      setIsLoading(false)
  
    } 

    fetchData();

  }, [url]);

  return {data, isLoading, error}

};

export default useFetch;