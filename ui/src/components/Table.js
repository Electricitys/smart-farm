import { Box, Truncate } from "@primer/components";
import { Component } from "react";
import { Column, Table as RVTable } from "react-virtualized";

class Table extends Component {

  render() {
    const { width, height, count, column, selected } = this.props;
    return (
      <RVTable
        width={width || 10}
        height={height || 10}
        deferredMeasurementCache={this._cache}
        rowCount={count}
        headerHeight={20}
        rowHeight={30}
        rowGetter={({ index }) => {
          return index + 1;
        }}
      >
        {selected.map((key) => {
          const { label, dataKey, width } = column.find(val => val.dataKey === key);
          return (
            <Column
              key={label}
              label={label}
              dataKey={dataKey}
              width={width}
              cellRenderer={this._columnCellRenderer}
            />
          )
        })}
      </RVTable>
    )
  }

  _columnCellRenderer = ({ dataKey, rowIndex }) => {
    const { list } = this.props;
    return (
      <Box>
        <Truncate maxWidth={175} title={`${list[rowIndex][dataKey]}` || ""}>
          {list[rowIndex][dataKey]}
        </Truncate>
      </Box>
    )
  }
}

export default Table;