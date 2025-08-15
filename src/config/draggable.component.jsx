import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DBTableItem from '../components/DBTableItem/db-table-item.component';

function SortableItem(props) {
  const { table, id } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DBTableItem table={table} />
    </div>
  );
}

export default SortableItem;
