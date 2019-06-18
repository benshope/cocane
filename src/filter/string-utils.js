// @flow
import React from 'react';
import styled from 'styled-components';
import {pairs} from 'd3-array';
import {theme} from './theme';

/**
 * split a string by the separator
 * @param  {string} str        - the target string, ex: 'a,b,c'
 * @param  {string} separator - the separator, ex: ','
 * @return {array} an array of string
 */
export function tokenize(str: string, separator?: string = ',') {
  if (str === '') {
    return [];
  }
  return str.split(separator);
}

/*
 * Find the prefix-matching strings in an array.
 * @param {string} str - the search word.
 * @param {array} arr - an array of object.
 * @param {Function} accessor - the accessor of the object in the array.
 * @param {number} outputNum - the number of matched strings in the output.
 */
export function findPrefixMatchingStrings(
  str: string,
  arr: string[],
  accessor: any => string,
  outputNum?: number = 5
): string[] {
  const inputValue = str.trim().toLowerCase();
  return arr
    .filter(
      s =>
        accessor(s)
          .toLowerCase()
          .slice(0, inputValue.length) === inputValue
    )
    .slice(0, outputNum);
}

/*
 * Find the fuzzy-match strings in an array.
 * @param {string} str - the search word.
 * @param {array} arr - an array of object.
 * @param {Function} accessors - array of accessors of the object in the array.
 * @param {number} outputNum - the number of matched strings in the output.
 */
export function findFuzzyMatchingStrings<T>(
  str: string,
  arr: $ReadOnlyArray<T>,
  accessors: $ReadOnlyArray<(T) => string>,
  outputNum?: number = 5
): $ReadOnlyArray<T> {
  const inputValue = str.trim().toLowerCase();
  return arr
    .filter(s =>
      accessors.some(acc =>
        acc(s)
          .toLowerCase()
          .includes(inputValue)
      )
    )
    .slice(0, outputNum);
}

const HighlightedSpan = styled.span`
  color: ${p =>
    (p.highlighted
      ? theme(['colors', 'mono900'])
      : theme(['colors', 'mono700']))(p)};
`;

export const HighlightedText = ({
  text,
  highlight
}: {
  text: string,
  highlight: string
}) => {
  if (
    !text ||
    !highlight ||
    text.toLowerCase().indexOf(highlight.toLowerCase()) === -1
  ) {
    return <HighlightedSpan highlighted={true}>{text}</HighlightedSpan>;
  }
  const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
  const endIndex = startIndex + highlight.length;
  const parts = pairs([0, startIndex, endIndex, text.length]).map(
    ([start, end]) => text.substring(start, end)
  );
  return (
    <span>
      {parts.map((part, index) => (
        <HighlightedSpan key={index} highlighted={index % 2 === 1}>
          {part}
        </HighlightedSpan>
      ))}
    </span>
  );
};

export function sentenceJoin(arr: Array<string>, lastSeparator: string) {
  return arr.length > 1
    ? arr
        .slice(0, -1)
        .join(', ')
        .concat(arr.length > 1 ? lastSeparator : '', arr.slice(-1)[0])
    : arr.length === 1
      ? arr[0]
      : '';
}
