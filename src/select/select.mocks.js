const cellWithValue = value => ({
  myCell: {
    value,
    input: "optionsCell"
  },
  optionsCell: {
    value: ["a list", "of", "string options"]
  }
});

export default [
  {
    name: "no value",
    state: cellWithValue(null)
  },
  {
    name: "set value",
    state: cellWithValue("a list")
  }
];
