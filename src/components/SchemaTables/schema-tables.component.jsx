import './schema-tables.styles.scss';
import SchemaTableItem from '../SchemaTableItem/schema-table-item.component';

const DBTables = (props) => {
  const { tablesNames } = props;

  return (
    <div className="tables-wrapper" aria-label="Database tables">
      <ul>
        {tablesNames.map((tableName) => (
          <SchemaTableItem key={tableName} tableName={tableName} />
        ))}
      </ul>
    </div>
  );
};

export default DBTables;
