import { useDroppable } from '@dnd-kit/core';
import './droppable.styles.scss';

function Droppable(props) {
  const { id } = props;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const className = `droppable ${isOver ? 'droppable-is-dragging' : ''}`;

  return (
    <div ref={setNodeRef} className={className}>
      {props.children}
    </div>
  );
}

export default Droppable;
