import readline from "readline";

export class StdinLineStream {
  rl: readline.Interface;

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
  }

  async getLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rl.on("line", (input: string) => {
        resolve(input);
      });
    });
  }

  async getLineAsNumbers(): Promise<Array<number>> {
    const line = await this.getLine();
    const split_whitespace = line.split(/\s+/);
    return split_whitespace.map(num => parseFloat(num));
  }

  close() {
    this.rl.close();
  }
}
