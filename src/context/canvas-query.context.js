import { createContext, useState } from 'react';
import axios from 'axios';

const CanvasQueryContext = createContext(null);

function CanvasQueryProvider(props) {
  const { children } = props;
  const [query, setQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  async function runQuery() {
    if (!query) {
      alert('No query to run');
      return;
    }

    const payload = {
      query: {
        definition: query,
      },
      options: {
        database: 'MySQL',
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/db/build-query`,
        payload,
        {
          withCredentials: true,
        }
      );

      setQueryResult(response.data.response);
    } catch (error) {
      alert('Error running query');
      console.log(error);
    }
  }

  const value = {
    setQuery,
    runQuery,
    queryResult,
  };

  return (
    <CanvasQueryContext.Provider value={value}>
      {children}
    </CanvasQueryContext.Provider>
  );
}

export { CanvasQueryContext, CanvasQueryProvider };
