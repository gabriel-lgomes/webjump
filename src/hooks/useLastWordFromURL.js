import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLastWordFromURL = () => {
  const [lastWord, setLastWord] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateLastWord = () => {
      const url = location.pathname;
      const urlParts = url.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      setLastWord(lastPart);
    };

    // Chamando a função de atualização sempre que a localização (rota) é alterada.
    updateLastWord();

  }, [location.pathname]);

  return lastWord;
};

export default useLastWordFromURL;
