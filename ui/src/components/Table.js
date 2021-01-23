import { Box } from "@primer/components";
import { Component } from "react";
import { Column, Table as RVTable } from "react-virtualized";

class Table extends Component {

  render() {
    const { width, height, column, selected } = this.props;
    return (
      <RVTable
        width={width || 10}
        height={height || 10}
        deferredMeasurementCache={this._cache}
        rowCount={30}
        headerHeight={20}
        rowHeight={30}
        rowGetter={({ index }) => {
          return index + 1;
        }}
      >
        {selected.map((key) => {
          const { label, dataKey } = column.find(val => val.dataKey === key);
          return (
            <Column
              key={label}
              label={label}
              dataKey={dataKey}
              width={width / selected.length}
              cellRenderer={this._columnCellRenderer}
            />
          )
        })}
      </RVTable>
    )
  }

  _columnCellRenderer = ({ dataKey, parent, rowIndex }) => {

    return (
      <Box>
        {`${dataKey}-${rowIndex}`}
      </Box>
    )
  }
}

export default Table;