import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const SchemaTablesContext = createContext(null);

function SchemaTablesProvider(props) {
  const { children } = props;
  const [tables, setTables] = useState(null);

  async function fetchTables() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/db/get-tables-details`,
        {
          options: {
            database: 'MySQL',
          },
        },
        {
          withCredentials: true,
        }
      );

      setTables(response.data.tables);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTables();
  }, []);

  const value = {
    tables,
    refetch: fetchTables,
  };

  return (
    <SchemaTablesContext.Provider value={value}>
      {children}
    </SchemaTablesContext.Provider>
  );
}

export { SchemaTablesContext, SchemaTablesProvider };
