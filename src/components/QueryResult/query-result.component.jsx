import { useContext } from 'react';
import { CanvasQueryContext } from '../../context/canvas-query.context';
import './query-result.styles.scss';

const QueryResult = () => {
  const { queryResult } = useContext(CanvasQueryContext);
  if (!queryResult) {
    return <div className="no-results">No query results to display</div>;
  }
  const { columns = [], rows = [] } = queryResult;

  return (
    <div
      className="query-results-wrapper"
      role="region"
      aria-label="Query results"
    >
      {(() => {
        if (columns.length === 0 || rows.length === 0) {
          return <div className="no-results">Query returned no results</div>;
        }

        return (
          <>
            <div className="table-wrapper">
              <table className="query-results-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="table-header">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="table-row">
                      {columns.map((column) => (
                        <td key={`${index}-${column}`} className="table-cell">
                          {row[column] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="results-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#636363"
              >
                <path d="M760-200v-120H200v120h560Zm0-200v-160H200v160h560Zm0-240v-120H200v120h560ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
              </svg>{' '}
              {rows.length}
            </div>
          </>
        );
      })()}
    </div>
  );
};
export default QueryResult;
