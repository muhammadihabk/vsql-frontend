import './schema-tables.styles.scss';
import SchemaTableItem from '../SchemaTableItem/schema-table-item.component';

const DBTables = (props) => {
  const { tables } = props;

  return (
    <div className="tables-wrapper" aria-label="Database tables">
      <ul>
        {tables.map((tableName) => (
          <SchemaTableItem key={tableName} tableName={tableName} />
        ))}
      </ul>
    </div>
  );
};

export default DBTables;
