import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
  const { id } = props;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    backgroundColor: isOver ? 'background-color: $color-bg-200' : undefined,

    border: '2px dashed #acacac',
    borderRadius: '7px',
    maxInlineSize: '18rem',
    blockSize: '14rem',
    marginInline: 'auto',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
