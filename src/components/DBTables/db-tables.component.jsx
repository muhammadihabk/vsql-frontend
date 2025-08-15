import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Draggable from '../../config/draggable.component';

import './db-tables.styles.scss';
import DBTableItem from '../DBTableItem/db-table-item.component';

const DBTables = (props) => {
  const tableIds = Object.keys(props.tables);
  const { tables } = props;

  return (
    <div className="tables-wrapper" aria-label="Database tables">
      <SortableContext items={tableIds} strategy={verticalListSortingStrategy}>
        <ul>
          {tables.map((table) => (
            <Draggable key={table} id={table} table={table}>
              <DBTableItem table={table} />
            </Draggable>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

export default DBTables;
