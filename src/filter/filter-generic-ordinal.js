// @flow
import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/fp/capitalize';

import Checkbox from '../checkbox';
import {theme} from '../theme';

const MultiSelectOptionDiv = styled.div`
  line-height: 1.5rem;
  display: flex;
  label {
    flex: 1;
    margin: 0;
    cursor: pointer;
  }
  color: ${theme(['colors', 'mono800'])};
  :hover {
    color: ${theme(['colors', 'mono900'])};
  }
  :active {
    color: ${theme(['colors', 'mono1000'])};
  }
`;

export const FilterOrdinalFactory = (options: string[]) => {
  const FilterOrdinal = ({
    onChange,
    filter
  }: {
    onChange: (filter: {value: number[]}) => void,
    filter: {value: number[]}
  }) => {
    const valuesMap = (filter.value || []).reduce(
      (acc, x) => ({...acc, [x]: true}),
      {}
    );
    return (
      <div>
        {options.map((option, x) => (
          <MultiSelectOptionDiv key={x}>
            <label>
              <Checkbox
                checked={Boolean(valuesMap[x])}
                onChange={() => {
                  const newValuesMap = {...valuesMap, [x]: !valuesMap[x]};
                  return onChange({
                    ...filter,
                    value: Object.keys(newValuesMap).filter(
                      m => newValuesMap[m]
                    )
                  });
                }}
              />
              <span style={{marginLeft: '0.5rem'}}>{capitalize(option)}</span>
            </label>
          </MultiSelectOptionDiv>
        ))}
      </div>
    );
  };
  return FilterOrdinal;
};
