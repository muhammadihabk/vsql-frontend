import { useContext, useState } from 'react';
import Button from '../button/button.component';
import './schema-query.styles.scss';
import axios from 'axios';
import { SchemaTablesContext } from '../../context/schema-tables.context';

const SchemaQuery = () => {
  const [query, setQuery] = useState('');
  const { refetch } = useContext(SchemaTablesContext);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/db/build-schema`,
        {
          query: query,
          options: {
            database: 'MySQL',
          },
        },
        {
          withCredentials: true,
        }
      );
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="query-wrapper" aria-label="Schema query">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="CREATE TABLE, INSERT, ..."
          value={query}
          onChange={handleChange}
        ></textarea>
        <Button
          inType="submit"
          text="Generate Schema"
          ctaType="primary"
          inClasses={['btn-schema-query']}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          }
        />
      </form>
    </div>
  );
};

export default SchemaQuery;
