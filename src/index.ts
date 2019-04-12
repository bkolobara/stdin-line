import readline from "readline";

export class StdinLineStream {
  rl: readline.Interface;
  buffer: Array<string>;
  resolvers: Array<(value?: string) => void>;

  constructor(stream?: NodeJS.ReadableStream) {
    let stdin: NodeJS.ReadableStream;
    if (stream) {
      stdin = stream;
    } else {
      stdin = process.stdin;
    }
    this.rl = readline.createInterface({
      input: stdin
    });
    this.buffer = [];
    this.resolvers = [];
    this.rl.on("line", (input: string) => {
      if (this.resolvers.length > 0) {
        let resolver = this.resolvers.shift();
        if (resolver) {
          resolver(input);
        }
      } else {
        this.buffer.push(input);
      }
    });
  }

  /* Returns a promise that will be resolved when the next line from stdin is available. */
  async getLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.buffer.length > 0) {
        resolve(this.buffer.shift());
      } else {
        this.resolvers.push(resolve);
      }
    });
  }

  /* Returns a promise containing an array of numbers that are parsed from the next stdin line. */
  async getLineAsNumbers(): Promise<Array<number>> {
    const line = await this.getLine();
    const split_whitespace = line.split(/\s+/);
    return split_whitespace.map(num => parseFloat(num));
  }

  close() {
    this.rl.close();
  }
}
