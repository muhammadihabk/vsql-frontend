import { Group, Line, Rect, Text } from 'react-konva';

function CanvasTable(props) {
  let { table, x = 0, y = 0 } = props;
  const styles = {
    accent: '#6ed084',
    bg: '#f1f5f9',
    colorText500: '#677681',
    colorText300: '#707e88',
    cornerRadius: 8,
  };
  const tableWidth = 200;
  const headerHeight = 35;
  const rowHeight = 35;
  const shapes = {
    wrapper: (
      <Rect
        x={x}
        y={y}
        width={tableWidth}
        height={table.columns.length * rowHeight + headerHeight + 7}
        fill="#ffffff"
        shadowColor="#000000"
        shadowBlur={4}
        shadowOffset={{ x, y }}
        shadowOpacity={0.2}
        cornerRadius={styles.cornerRadius}
      />
    ),
    accentLine: (
      <Rect
        x={x}
        y={y}
        width={tableWidth}
        height={7}
        fill={styles.accent}
        cornerRadius={[8, 8]}
      />
    ),
    header: (
      <>
        <Rect
          x={x}
          y={y + 7}
          width={tableWidth}
          height={rowHeight}
          fill={styles.bg}
        />
        <Line
          points={[x, y + 7 + rowHeight, x + tableWidth, y + 7 + rowHeight]}
          stroke="#e0e9ef"
          strokeWidth={1}
        />
        <Text
          x={x}
          y={y + 7}
          text={table.name}
          width={tableWidth}
          height={rowHeight}
          align="center"
          verticalAlign="middle"
          fontSize={19}
          fill={styles.colorText500}
          fontStyle="bold"
        />
      </>
    ),
    rows: table.columns.map((column, i) => (
      <>
        <Rect
          x={x}
          y={y + 7 + rowHeight * (i + 1)}
          width={tableWidth}
          height={rowHeight}
          cornerRadius={styles.cornerRadius}
          onMouseEnter={(e) => {
            e.target.fill('#f1f5f97d');
            e.target.getStage().container().style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            e.target.fill('transparent');
            e.target.getStage().container().style.cursor = 'default';
          }}
        />
        <Text
          x={x}
          y={y + 7 + rowHeight * (i + 1)}
          text={column}
          width={tableWidth}
          height={rowHeight}
          padding={21}
          align="left"
          verticalAlign="middle"
          fontSize={15}
          fill={styles.colorText300}
          listening={false}
        />
      </>
    )),
  };

  return (
    <Group x={x} y={y} draggable>
      {shapes.wrapper}
      {shapes.accentLine}
      {shapes.header}
      {shapes.rows}
    </Group>
  );
}
export default CanvasTable;
