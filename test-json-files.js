const fs = require("node:fs/promises");
const { glob } = require("glob");

// TODO: better handling of arguments
const IS_VERBOSE = process.argv[2] === "--verbose";

const logVerbose = (...args) => {
  if (IS_VERBOSE) {
    console.log(...args);
  }
};

const parseJsonFile = async (filePath) => {
  const content = await fs.readFile(filePath);

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const main = async () => {
  const jsonFilePaths = await glob("**/*.json");

  for (const filePath of jsonFilePaths) {
    logVerbose(`> parsing of ${filePath}`);
    const _parsed = await parseJsonFile(filePath);
  }

  console.log(`> Successfully parsed ${jsonFilePaths.length} json files.`);
};

main()
  .then((res) => {
    if (res) {
      console.log(res);
    }
  })
  .catch(console.error);
