import { useContext, useEffect, useRef, useState } from 'react';
import './canvas.styles.scss';

import { Layer, Stage } from 'react-konva';
import CanvasTable from '../CanvasTable/canvas-table.component';
import { CanvasQueryContext } from '../../context/canvas-query.context';

const Canvas = (props) => {
  const { tables } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [canvasTables, setCanvasTables] = useState({});
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [prepCanvasQuery, setPrepCanvasQuery] = useState({
    query: {
      columns: [],
      relationships: {},
    },
  });
  const { setQuery } = useContext(CanvasQueryContext);

  useEffect(() => {
    if (wrapperRef.current?.offsetHeight && wrapperRef.current?.offsetWidth) {
      setDimensions({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      });
    }
  }, []);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    handleDragLeave();
    const tableName = e.dataTransfer.getData('tableName');
    const table = tables[tableName];
    setCanvasTables((pv) => ({ ...pv, [tableName]: table }));
  }

  function handleRowClick(options) {
    let columns = prepCanvasQuery.query.columns;
    let relationships = prepCanvasQuery.query.relationships;
    const colName = `${options.tableName}.${options.column}`;

    if (options.isColAdded) {
      columns.push(colName);
      addRelation(relationships, columns, options);
    } else {
      columns = columns.filter((col) => col !== colName);
      columns = removeRelation(relationships, columns, options);
    }

    const query = {
      query: {
        columns,
        relationships,
      },
    };
    setPrepCanvasQuery(query);
    setQuery(query);
  }

  function addRelation(relationships, columns, options) {
    const foundRelation =
      tables[options.tableName].relationships?.[options.column];

    if (foundRelation?.length) {
      columns.push(`${foundRelation[0]}.${foundRelation[1]}`);
      relationships[options.tableName] = {
        ...relationships[options.tableName],
        [foundRelation[0]]: {
          columns: [options.column, foundRelation[1]],
        },
      };
    }
  }

  function removeRelation(relationships, columns, options) {
    const foundRelation =
      tables[options.tableName].relationships?.[options.column];
    if (foundRelation?.length) {
      delete relationships[options.tableName][foundRelation[0]];
      const colName = `${foundRelation[0]}.${foundRelation[1]}`;
      columns = columns.filter((col) => col !== colName);
    }

    return columns;
  }

  return (
    <div
      ref={wrapperRef}
      className={`${'builder-canvas-wrapper'} ${
        isDragging ? 'builder-canvas-wrapper-is-dragging' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {Object.entries(canvasTables).map(([tableName, value], i) => {
            const GRID_SIZE = 150;
            const ROW_HEIGHT = 35;
            const col = i % 3; // 3 tables per row
            const row = Math.floor(i / 3);
            const x = col * GRID_SIZE + 50;
            const y = row * value.columns.length * ROW_HEIGHT + 50; // Adjust based on table height

            value.name = tableName;

            return (
              <CanvasTable
                key={tableName}
                x={x}
                y={y}
                rowHeight={ROW_HEIGHT}
                table={value}
                handleRowClick={handleRowClick}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
