import inputNumberList from "../input-number-list";
import histogram from "../histogram";

export default [
  {
    name: "connected cells",
    state: {
      myCell: {
        value: ["numbersCell", "histogramCell"]
      },
      numbersCell: {
        type: inputNumberList.type,
        value: [4, 2, 1, 4, 2, 4, 5, 6, 3, 2]
      },
      histogramCell: {
        type: histogram.type,
        input: "numbersCell"
      }
    }
  }
];
