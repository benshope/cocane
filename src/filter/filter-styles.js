import styled from "styled-components";

import { Input, Select } from "../inputs-styles";
import { ButtonGroup } from "../button";
import { theme } from "../theme";

export const FilterSelect = styled(Select)`
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
  margin-bottom: 0.25rem;
`;

export const FilterInput = styled(Input)`
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
  margin-bottom: 0.25rem;
  flex-grow: 1;
`;

export const FilterHeaderDiv = styled.div`
  display: block;
  font-family: ${theme(["primaryFontFamily"])};
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 2em;
  .description {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const MinAndMaxDiv = styled.div`
  font-family: ${theme(["primaryFontFamily"])};
  color: ${theme(["colors", "mono800"])};
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  margin-bottom: 0.75em;
`;

export const WideButtonGroup = styled(ButtonGroup)`
  width: 100%;
  margin: 0.5rem 0;
`;
