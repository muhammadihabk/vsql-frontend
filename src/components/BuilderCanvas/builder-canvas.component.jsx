import './builder-canvas.styles.scss';
import Droppable from '../../config/droppable.component';

const BuilderCanvas = (props) => {
  const { tables } = props;

  return (
    <Droppable id="droppable" className="canvas-wrapper">
      {Object.entries(tables).map(([table, value]) => {
        return value.isDropped && <div key={table}>{table}</div>;
      })}
    </Droppable>
  );
};

export default BuilderCanvas;
