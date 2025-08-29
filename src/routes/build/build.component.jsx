import Canvas from '../../components/Canvas/canvas.component';
import SchemaTables from '../../components/SchemaTables/schema-tables.component';
import QueryResult from '../../components/QueryResult/query-result.component';
import SchemaQuery from '../../components/SchemaQuery/schema-query.component';
import './build.styles.scss';
import { useContext } from 'react';
import { SchemaTablesContext } from '../../context/schema-tables.context';
import Spinner from '../../components/spinner/spinner.component';

function Build() {
  const { tables } = useContext(SchemaTablesContext);
  if (!tables) {
    return <Spinner />;
  }
  const tablesNames = Object.keys(tables);

  return (
    <main className="build-wrapper">
      <section className="schema-panel" aria-labelledby="schema-title">
        <SchemaTables tablesNames={tablesNames} />
        <SchemaQuery />
      </section>

      <section className="builder-panel" aria-labelledby="builder-title">
        <Canvas tables={tables} />
        <QueryResult />
      </section>
    </main>
  );
}

export default Build;
