import './schema-tables.styles.scss';
import SchemaTableItem from '../SchemaTableItem/schema-table-item.component';

const DBTables = (props) => {
  const { tablesNames } = props;

  return (
    <div
      className={`tables-wrapper ${
        !tablesNames.length ? 'no-results-container' : ''
      }`}
      aria-label="Database tables"
    >
      {tablesNames.length ? (
        <ul>
          {tablesNames.map((tableName) => (
            <SchemaTableItem key={tableName} tableName={tableName} />
          ))}
        </ul>
      ) : (
        <div className="no-results">No tables to display</div>
      )}
    </div>
  );
};

export default DBTables;
