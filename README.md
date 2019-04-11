## Motivation

This library was created after my unsuccessful attempts to participate in the
[Google Code Jam competition](https://codingcompetitions.withgoogle.com/codejam)
using TypeScript.

Solutions must read all input from standard input (stdin), but node.js doesn't
provide a user friendly way in doing so.
Even the [official examples](https://bit.ly/2G5LT7j) use a lot of boilerplate to
construct a state machine handling the input. This resulted in me wasting 90% of
my time dealing with the input instead of solving the algorithmic problems.
Because of this I created this library that allows you to read from stdin using a
intuitive async/await syntax.

## Usage

## Example

Read 2 numbers from stdin and display the sum of them.

```javascript
import { StdinLineStream } from "stdin-line";

(async function() {
  let inputStream = new StdinLineStream();
  let [a, b] = await inputStream.getLineAsNumbers();
  console.log(a + b);
  inputStream.close();
})();
```
