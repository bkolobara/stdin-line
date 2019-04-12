## Motivation

This library was created after my unsuccessful attempts to participate in the
[Google Code Jam competition](https://codingcompetitions.withgoogle.com/codejam)
using TypeScript.

Solutions must read from standard input (stdin), but node.js doesn't provide a
user friendly way to do it. Even the [official examples](https://bit.ly/2G5LT7j)
use a lot of boilerplate to construct a state machine handling the input. This
resulted in me wasting 90% of my time dealing with the input instead of solving
the algorithmic problems. Because of this I created this library that allows you
to read from stdin using an intuitive async/await syntax.

## Installation

You can add it to your JavaScript/TypeScript project with:

```bash
$ npm i stdin-line
# or
$ yarn add stdin-line
```

## Usage

Create a `StdinLineStream` object and use the methods `getLine()` and
`getLineAsNumbers()` to read from stdin. Both return promises and can be used
with async/await. After you are done close the stream with `close()`. If you
don't close the stream the application will continue listening for input and
never finish.

If you are using it for Google Code Jam you will need to submit only one file.
In this case the best solution is to use a tool like [rollup](https://rollupjs.org/)
to boundle this library with your solution and submit it as one regular JavaScript
file. An example of a complete Google Code Jam qualification round solution can be
found in the [examples folder](https://github.com/bkolobara/stdin-line/tree/master/examples).

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
