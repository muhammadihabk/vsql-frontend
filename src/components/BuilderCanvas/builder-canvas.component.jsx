import { useState } from 'react';
import './builder-canvas.styles.scss';

const BuilderCanvas = (props) => {
  const { tables } = props;
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    handleDragLeave();
  }


  return (
    <div
      className={`${'builder-canvas-wrapper'} ${
        isDragging ? 'builder-canvas-wrapper-is-dragging' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {Object.entries(tables).map(([table, value]) => {
        return value.isDropped && <div key={table}>{table}</div>;
      })}
    </div>
  );
};

export default BuilderCanvas;
