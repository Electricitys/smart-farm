import { Box, Truncate } from "@primer/components";
import { Component } from "react";
import { Column, Table as RVTable, InfiniteLoader } from "react-virtualized";

class Table extends Component {
  state = {
    loadedRowsMap: {}
  }
  render() {
    const {
      width,
      height,
      count,
      column,
      selected,
      list,
      onLoadMoreRows
    } = this.props;
    return (
      <InfiniteLoader
        isRowLoaded={({ index }) => !!list[index]}
        loadMoreRows={onLoadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) => (
          <RVTable
            ref={registerChild}
            width={width || 10}
            height={height || 10}
            onRowsRendered={onRowsRendered}
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
        )}
      </InfiniteLoader>
    )
  }

  _columnCellRenderer = ({ dataKey, rowIndex }) => {
    const { list } = this.props;
    let value = "loading";
    if (list[rowIndex]) {
      value = "null";
      if (list[rowIndex][dataKey]) {
        value = list[rowIndex][dataKey];
      }
    }
    return (
      <Box>
        <Truncate maxWidth={175} title={`${value}` || ""}>
          {`${value}` || "empty"}
        </Truncate>
      </Box>
    )
  }
}

export default Table;