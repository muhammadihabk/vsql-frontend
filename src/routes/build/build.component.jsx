import BuilderCanvas from '../../components/BuilderCanvas/builder-canvas.component';
import DBTables from '../../components/DBTables/db-tables.component';
import QueryResult from '../../components/QueryResult/query-result.component';
import SchemaQuery from '../../components/SchemaQuery/schema-query.component';
import './build.styles.scss';

function Build() {
  return (
    <main>
      <section className="schema-panel" aria-labelledby="schema-title">
        <h2 id="schema-title">Database Schema</h2>
        <DBTables />
        <SchemaQuery />
      </section>

      <section className="builder-panel" aria-labelledby="builder-title">
        <h2 id="builder-title">Query Builder</h2>
        <BuilderCanvas />
        <QueryResult />
      </section>
    </main>
  );
}

export default Build;
