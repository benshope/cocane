import React from "react";
import PropTypes from "prop-types";

const BigNumber = ({ value }) => (
  <div style={{ fontSize: "4em" }}>{`${
    typeof value === "number" ? value : "NaN"
  }`}</div>
);
BigNumber.propTypes = { value: PropTypes.number };
export default BigNumber;
