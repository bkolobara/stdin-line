const readline = require("readline");

export class StdinLine {
  rl: any;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async getLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rl.on("line", (input: string) => {
        resolve(input);
      });
    });
  }

  close() {
    this.rl.close();
  }
}

(async function() {
  let stdl = new StdinLine();
  let x = await stdl.getLine();
  console.log(x);
  let m = await stdl.getLine();
  console.log(m);
  stdl.close();
})();
