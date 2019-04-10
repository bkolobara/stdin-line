const readline = require("readline");

async function getStdinLine(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.on("line", (input: string) => {
      resolve(input);
      rl.close();
    });
  });
}

(async function() {
  let x = await getStdinLine();
  console.log(x);
  let m = await getStdinLine();
  console.log(m);
})();
