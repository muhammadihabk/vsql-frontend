import { useContext, useEffect, useRef, useState } from 'react';
import './canvas.styles.scss';

import { Layer, Stage } from 'react-konva';
import CanvasTable from '../CanvasTable/canvas-table.component';
import { CanvasQueryContext } from '../../context/canvas-query.context';

const Canvas = (props) => {
  const { tables } = props;
  const [canvasTables, setCanvasTables] = useState({});
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const tempQuery = useRef({
    columns: [],
    relationships: {},
  });
  const { setQuery } = useContext(CanvasQueryContext);
  const relationObject = {
    addRelation(relationships, columns, options) {
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

      return {
        foundRelation,
      };
    },
    removeRelation(relationships, columns, options) {
      const foundRelation =
        tables[options.tableName].relationships?.[options.column];
      if (foundRelation?.length) {
        delete relationships[options.tableName][foundRelation[0]];
        const colName = `${foundRelation[0]}.${foundRelation[1]}`;
        columns = columns.filter((col) => col !== colName);
      }

      return {
        foundRelation,
        columns,
      };
    },
  };
  const relationProxy = new Proxy(relationObject, {
    get(target, prop, _) {
      const originalValue = target[prop];

      if (typeof originalValue !== 'function') {
        return originalValue;
      }

      return function (...args) {
        const result = originalValue.apply(this, args);

        if (!result.foundRelation?.length) {
          return result;
        }
        if (prop === 'addRelation') {
          setCanvasTables((pv) => {
            const newTable = {
              ...tables[result.foundRelation[0]],
              activeColumn: result.foundRelation[1],
            };

            return {
              ...pv,
              [result.foundRelation[0]]: newTable,
            };
          });
        } else if (prop === 'removeRelation') {
          setCanvasTables((prev) => ({
            ...prev,
            [result.foundRelation[0]]: {
              ...prev[result.foundRelation[0]],
              activeColumn: null,
            },
          }));
        }

        return result;
      };
    },
  });

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
  }

  function handleDrop(e) {
    e.preventDefault();
    const tableName = e.dataTransfer.getData('tableName');
    const table = tables[tableName];

    const stage = stageRef.current;
    if (!stage) return;

    const stageBox = stage.container().getBoundingClientRect();
    const x = e.clientX - stageBox.left;
    const y = e.clientY - stageBox.top;

    setCanvasTables((prev) => ({
      ...prev,
      [tableName]: { ...table, x, y, name: tableName },
    }));
  }

  function handleRowClick(options) {
    const colName = `${options.tableName}.${options.column}`;

    if (options.isColAdded) {
      tempQuery.current.columns.push(colName);
      relationProxy.addRelation(
        tempQuery.current.relationships,
        tempQuery.current.columns,
        options
      );
    } else {
      tempQuery.current.columns = tempQuery.current.columns.filter(
        (col) => col !== colName
      );
      tempQuery.current.columns = relationProxy.removeRelation(
        tempQuery.current.relationships,
        tempQuery.current.columns,
        options
      ).columns;
    }

    setQuery(tempQuery.current);
  }

  function handleTableDragEnd(e, tableName) {
    const newX = e.target.x();
    const newY = e.target.y();
    setCanvasTables((prev) => ({
      ...prev,
      [tableName]: { ...prev[tableName], x: newX, y: newY },
    }));
  }

  return (
    <div
      ref={wrapperRef}
      className="builder-canvas-wrapper"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Stage ref={stageRef} width={dimensions.width} height={dimensions.height}>
        <Layer>
          {Object.entries(canvasTables).map(([tableName, tableData]) => {
            return (
              <CanvasTable
                key={tableName}
                name={tableName}
                x={tableData.x}
                y={tableData.y}
                rowHeight={35}
                table={tableData}
                handleRowClick={handleRowClick}
                onDragEnd={handleTableDragEnd}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
