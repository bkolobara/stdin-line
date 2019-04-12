import { StdinLineStream } from "./index";
import { Readable } from "stream";

test("reading hello world", async () => {
  const mockStdin = new Readable({ read() {} });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("hello world\n");
  const input = await stdin.getLine();
  expect(input).toBe("hello world");
  process.stdin.destroy();
});

test("reading '1 2 3' as an number array", async () => {
  const mockStdin = new Readable({ read() {} });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("1 2 3\n");
  const input = await stdin.getLineAsNumbers();
  expect(input).toEqual([1, 2, 3]);
});

test("reading '3.23 1234.5555' as na number array", async () => {
  const mockStdin = new Readable({ read() {} });

  const stdin = new StdinLineStream(mockStdin);
  mockStdin.push("3.23 1234.5555\n");
  const [first, second] = await stdin.getLineAsNumbers();
  expect(first).toBe(3.23);
  expect(second).toBe(1234.5555);
});

test("buffer of 10000 lines", async () => {
  const mockStdin = new Readable({ read() {} });

  const stdin = new StdinLineStream(mockStdin);
  for (let i = 0; i < 10000; i++) {
    mockStdin.push(`String #${i}\n`);
  }
  for (let i = 0; i < 10000; i++) {
    const line = await stdin.getLine();
    expect(line).toBe(`String #${i}`);
  }
});

test("interchangeable read  of 10000 lines", async () => {
  const mockStdin = new Readable({ read() {} });

  const stdin = new StdinLineStream(mockStdin);
  for (let i = 0; i < 10000; i++) {
    mockStdin.push(`this is a longer input #${i}\n`);
    const line = await stdin.getLine();
    expect(line).toBe(`this is a longer input #${i}`);
  }
});

// process.stdin needs to be manually destroyed or Jest hangs on it.
afterAll(() => {
  process.stdin.destroy();
});
