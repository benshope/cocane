import { sentenceJoin } from "../string-utils";
import { FilterOrdinalFactory } from "./filter-generic-ordinal";
import { validDate } from "./filter-times-common";
import { updateFilter } from "./filter-actions";

import type { FilterComponent } from "./filter-types";

const TYPE = "HOUR_OF_DAY";

const VALUES = [...Array(24).keys()].map(
  hour => `${hour % 12 || 12}${hour <= 12 ? "am" : "pm"}`
);

export type UIProps = {| +filterType: typeof TYPE |};
export type FilterType = {|
  +filterType: typeof TYPE,
  +value: number[],
  +full?: boolean
|};

const FilterText = ({ value, not }) => {
  if (!value || !value.length) {
    return `${not ? "Any" : "No"} hour of the day`;
  }
  const description = `${sentenceJoin(value.map(i => VALUES[i]), " or ")}`;
  return not ? `Not ${description.toLowerCase()}` : description;
};

export default ({
  editor: ({ filter, dispatch }) =>
    FilterOrdinalFactory(VALUES)({
      filter,
      onChange: f => dispatch(updateFilter({ ...filter, value: f.value }))
    }),
  text: FilterText,
  filterValue: ({ value, not }) => {
    const valueMap = value.reduce((acc, v) => ({ ...acc, [v]: true }), {});
    return dataPoint => {
      const datePoint = validDate(dataPoint);
      return datePoint ? valueMap[datePoint.getHours()] : false;
    };
  },
  createFilter: filter => ({
    filterType: TYPE,
    value: [],
    not: true,
    ...(filter || {})
  }),
  filterType: TYPE
}: FilterComponent<FilterType, UIProps>);
