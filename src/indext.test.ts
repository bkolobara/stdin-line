import { StdinLineStream } from "./index";
import { Readable } from "stream";

test("reading 'hello world' from stdin", async () => {
  const mockStdin = new Readable({
    read() {}
  });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("hello world\n");
  const input = await stdin.getLine();
  expect(input).toBe("hello world");
  process.stdin.destroy();
});

test("reading '1 2 3' as na number array", async () => {
  const mockStdin = new Readable({
    read() {}
  });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("1 2 3\n");
  const input = await stdin.getLineAsNumbers();
  expect(input).toEqual([1, 2, 3]);
  process.stdin.destroy();
});

test("reading '3.23 1234.5555' as na number array", async () => {
  const mockStdin = new Readable({
    read() {}
  });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("3.23 1234.5555\n");
  const [first, second] = await stdin.getLineAsNumbers();
  expect(first).toBe(3.23);
  expect(second).toBe(1234.5555);
  process.stdin.destroy();
});
