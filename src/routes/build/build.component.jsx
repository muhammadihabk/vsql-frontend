import Canvas from '../../components/Canvas/canvas.component';
import SchemaTables from '../../components/SchemaTables/schema-tables.component';
import QueryResult from '../../components/QueryResult/query-result.component';
import SchemaQuery from '../../components/SchemaQuery/schema-query.component';
import './build.styles.scss';
import { useState } from 'react';

function Build() {
  const inTables = {
    customer: {
      isDropped: false,
      columns: ['address', 'id', 'name'],
    },
    order_: {
      isDropped: false,
      columns: ['amount', 'customer_id', 'order_date', 'order_no', 'store_id'],
      relationships: {
        customer: ['customer_id', 'id'],
        store: ['store_id', 'id'],
      },
    },
    store: {
      isDropped: false,
      columns: ['city', 'id'],
    },
  };
  const [tables, setTables] = useState(inTables);
  const tableIds = Object.keys(tables).filter(
    (table) => !tables[table].isDropped
  );

  return (
    <main className="build-wrapper">
      <section className="schema-panel" aria-labelledby="schema-title">
        <h2 id="schema-title" className="h2-">
          Database Schema
        </h2>
        <SchemaTables tables={tableIds} />
        <SchemaQuery />
      </section>

      <section className="builder-panel" aria-labelledby="builder-title">
        <Canvas tables={tables} />
        {/* <QueryResult /> */}
      </section>
    </main>
  );
}

export default Build;
