// @flow
import React from 'react';
import type {Element} from 'react';
import {List, AutoSizer, InfiniteLoader} from 'react-virtualized';

export type Alignment = 'auto' | 'end' | 'start' | 'center';

export type NoContentRenderer = () => Element<*> | null;

export type CellSizeGetter = (params: {index: number}) => number;

export type CellSize = number | CellSizeGetter;

export type OverscanIndicesGetterParams = {
  direction: 'horizontal' | 'vertical',
  scrollDirection: -1 | 1,
  cellCount: number,
  overscanCellsCount: number,
  startIndex: number,
  stopIndex: number
};

export type OverscanIndices = {
  overscanStartIndex: number,
  overscanStopIndex: number
};

export type OverscanIndicesGetter = (
  params: OverscanIndicesGetterParams
) => OverscanIndices;

export type RowRendererParams = {
  index: number,
  isScrolling: boolean,
  isVisible: boolean,
  key: string,
  parent: Object,
  style: Object
};

export type RenderedRows = {
  overscanStartIndex: number,
  overscanStopIndex: number,
  startIndex: number,
  stopIndex: number
};

export type Scroll = {
  clientHeight: number,
  scrollHeight: number,
  scrollTop: number
};

export type InfiniteArgs = {
  isRowLoaded: ({index: number}) => boolean,
  rowCount: number,
  setListRef?: Function,
  loadMoreRows: ({startIndex: number, stopIndex: number}) => Promise<any>,
  renderer: (params: RowRendererParams) => Element<*>,
  rowHeight: CellSize,
  disableWidth?: boolean,
  disableHeight?: boolean,
  onScroll: (params: Scroll) => void,
  listProps?: {
    'aria-label'?: string,
    autoHeight?: boolean,
    className?: string,
    estimatedRowSize?: number,
    height?: number,
    noRowsRenderer?: NoContentRenderer,
    onRowsRendered?: (params: RenderedRows) => void,
    overscanIndicesGetter?: OverscanIndicesGetter,
    overscanRowCount?: number,
    scrollToAlignment?: Alignment,
    scrollToIndex?: number,
    scrollTop?: number,
    style?: Object,
    tabIndex?: number,
    width?: number
  }
};

const Infinite = ({
  isRowLoaded,
  rowCount,
  loadMoreRows,
  setListRef,
  renderer,
  // $FlowFixMe https://github.com/facebook/flow/issues/183#issuecomment-358607052
  rowHeight = 50,
  disableWidth = false,
  disableHeight = false,
  onScroll = () => {},
  listProps
}: InfiniteArgs) => (
  <AutoSizer disableHeight={disableHeight} disableWidth={disableWidth}>
    {({width: autosizedWidth, height: autosizedHeight}) => {
      /* eslint-disable no-undef,no-constant-condition */
      const width = process.env.NODE_ENV === 'test' ? 400 : autosizedWidth;
      const height = process.env.NODE_ENV === 'test' ? 400 : autosizedHeight;
      /* eslint-enable no-undef */
      return (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
        >
          {({onRowsRendered, registerChild}) => (
            <List
              height={height}
              onRowsRendered={onRowsRendered}
              ref={x => {
                /* eslint-disable no-unused-expressions */
                setListRef && setListRef(x);
                registerChild(x);
                /* eslint-enable no-unused-expressions */
              }}
              rowCount={rowCount}
              rowHeight={rowHeight}
              columnWidth={width}
              rowRenderer={renderer}
              width={width}
              onScroll={onScroll}
              {...listProps}
            />
          )}
        </InfiniteLoader>
      );
    }}
  </AutoSizer>
);

export default Infinite;
