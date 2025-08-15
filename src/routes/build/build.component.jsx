import { DndContext, DragOverlay } from '@dnd-kit/core';
import BuilderCanvas from '../../components/BuilderCanvas/builder-canvas.component';
import DBTables from '../../components/DBTables/db-tables.component';
import QueryResult from '../../components/QueryResult/query-result.component';
import SchemaQuery from '../../components/SchemaQuery/schema-query.component';
import './build.styles.scss';
import { useState } from 'react';
import DBTableItem from '../../components/DBTableItem/db-table-item.component';

function Build() {
  const inTables = {
    Customer: {
      isDropped: false,
    },
    Order: { isDropped: false },
    Store: { isDropped: false },
  };
  const [tables, setTables] = useState(inTables);
  const tableIds = Object.keys(tables).filter(
    (table) => !tables[table].isDropped
  );
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);
    if (!over || active.id === over.id) return;
    if (over) {
      setTables((pastTables) => {
        const result = {
          ...pastTables,
          [event.active.id]: { isDropped: true },
        };
        return result;
      });
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={false}
    >
      <main className="page-wrapper">
        <section className="schema-panel" aria-labelledby="schema-title">
          <h2 id="schema-title" className="h2-">
            Database Schema
          </h2>
          <DBTables tables={tableIds} />
          <SchemaQuery />
        </section>

        <DragOverlay>
          {activeId ? (
            <div className="drag-overlay-wrapper">
              <ul>
                <DBTableItem table={activeId} isDragOverlay={true} />
              </ul>
            </div>
          ) : null}
        </DragOverlay>

        <section className="builder-panel" aria-labelledby="builder-title">
          <h2 id="builder-title" className="h2-">
            Query Builder
          </h2>

          <BuilderCanvas tables={tables} />
          <QueryResult />
        </section>
      </main>
    </DndContext>
  );
}

export default Build;
