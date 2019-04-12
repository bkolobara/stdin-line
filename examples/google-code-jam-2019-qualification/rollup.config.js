import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "foregone.js",
  output: {
    file: "foregone.rollup.js",
    format: "cjs"
  },
  plugins: [resolve(), commonjs()]
};
