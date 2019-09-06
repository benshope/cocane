const cellWithValue = value => ({
  myCell: {
    input: "valuesCell"
  },
  valuesCell: {
    value
  }
});

export default [
  {
    name: "numbers",
    state: cellWithValue([8, 555, 20, 20, 1, 1, 1, 1, 5, 5, 2, 1, 1])
  },
  {
    name: "empty",
    state: cellWithValue([])
  }
];
