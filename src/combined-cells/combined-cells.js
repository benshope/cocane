import React from "react";

import { WideButtonGroup } from "./filter-styles";
import { updateFilter } from "./filter-actions";

import type { FilterComponents } from "./filter-types";

const preservedValue = (oldFilter, newFilter) => {
  const arrayFrom = (v: number | [number, number]) =>
    Array.isArray(v)
      ? v
      : newFilter.value === Infinity
      ? [v, Infinity]
      : [-Infinity, v];
  const valueFrom = (v: number | [number, number]) =>
    Array.isArray(v) ? (newFilter.value === Infinity ? v[1] : v[0]) : v;
  return {
    value: (Array.isArray(newFilter.value) ? arrayFrom : valueFrom)(
      oldFilter.value
    )
  };
};

const editorWithButtons = (
  editor,
  filterOptions,
  preserveValueOnTypeChange
) => {
  const Editor = (props: any) => {
    const filterButtons = filterOptions.filter(
      filterOption =>
        filterOption.label &&
        (!props.enabledTypes ||
          (filterOption.filter.filterType
            ? props.enabledTypes[filterOption.filter.filterType]
            : Object.keys(filterOption.filter.filterTypes).some(
                t => props.enabledTypes[t]
              )))
    );

    return (
      <div>
        {filterButtons.length > 1 && (
          <WideButtonGroup>
            {filterButtons.map(({ label, filter, operator }) => (
              <button
                title={label}
                disabled={
                  (filter.filterType
                    ? filter.filterType === props.filter.filterType
                    : filter.filterTypes[props.filter.filterType]) &&
                  (!operator || operator === (props.filter: any).operator)
                }
                onClick={() => {
                  /* eslint-disable no-unused-vars */
                  const {
                    operator: removedOperator,
                    ...restOfFilter
                  } = (props.filter: any);
                  /* eslint-enable no-unused-vars */
                  const newFilter = filter.createFilter();
                  props.dispatch(
                    updateFilter({
                      ...restOfFilter,
                      ...newFilter,
                      ...(preserveValueOnTypeChange
                        ? preservedValue(props.filter, newFilter)
                        : {}),
                      ...(operator ? { operator } : {})
                    })
                  );
                }}
                key={label}
              >
                {label}
              </button>
            ))}
          </WideButtonGroup>
        )}
        {editor(props)}
      </div>
    );
  };
  return Editor;
};

export function combineFilters<OneFilter, UIProps>(
  filters: $ReadOnlyArray<{
    label?: string,
    operator?: string,
    filter: Object
  }>,
  preserveValueOnTypeChange?: boolean
): FilterComponents<OneFilter, UIProps> {
  const filtersByType = filters.reduce((acc, { filter }) => {
    if (filter.filterType) {
      acc[filter.filterType] = filter;
    }
    if (filter.filterTypes) {
      Object.keys(filter.filterTypes).forEach(filterType => {
        acc[filterType] = filter;
      });
    }
    return acc;
  }, {});
  return {
    filterTypes: filters.reduce(
      (acc, { filter }) => ({
        ...acc,
        ...(filter.filterTypes || { [filter.filterType]: filter.filterType })
      }),
      {}
    ),
    filterValue: filter => {
      const matchIngFilter = filtersByType[(filter: any).filterType];
      return (
        matchIngFilter &&
        matchIngFilter.filterValue &&
        matchIngFilter.filterValue(filter)
      );
    },
    filterAll: filter => {
      const matchIngFilter = filtersByType[(filter: any).filterType];
      return (
        matchIngFilter &&
        matchIngFilter.filterAll &&
        matchIngFilter.filterAll(filter)
      );
    },
    createFilter: (partialFilter: any) => {
      return (partialFilter && partialFilter.filterType
        ? filtersByType[partialFilter.filterType]
        : filters[0].filter
      ).createFilter(partialFilter);
    },
    reducers: filters.reduce(
      (acc, { filter }) => ({
        ...acc,
        ...(filter.filterType
          ? { [filter.filterType]: filter.reducers }
          : filter.reducers)
      }),
      {}
    ),
    text: (filter: any) => {
      const matchingFilter = filtersByType[filter.filterType];
      return matchingFilter && matchingFilter.text(filter);
    },
    editor: (props: any) => {
      const foundFilter = filtersByType[props.filter.filterType];
      return editorWithButtons(
        foundFilter.editor,
        filters,
        preserveValueOnTypeChange
      )(props);
    }
  };
}
