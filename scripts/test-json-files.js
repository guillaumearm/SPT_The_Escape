const fs = require("node:fs/promises");
const { glob } = require("glob");
const jsonc = require("jsonc");
const JSON5 = require("json5");

const IS_VERBOSE = true;

const JSON_PARSERS = {
  json: JSON.parse.bind(JSON),
  json5: JSON5.parse.bind(JSON5),
  jsonc: jsonc.parse.bind(jsonc),
};

const getParser = (parserName) => {
  return JSON_PARSERS[parserName];
};

const logVerbose = (...args) => {
  if (IS_VERBOSE) {
    console.log(...args);
  }
};

const parseFile = async (parser, filePath) => {
  const content = await fs.readFile(filePath, "utf-8");

  try {
    return parser(content);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getFileTypeFromArgv = (argv) => {
  const [_arg1, _arg2, rawFileType] = argv;
  const fileType = rawFileType?.toLowerCase().trim();
  const parserFound = Boolean(JSON_PARSERS[fileType]);

  if (!parserFound && fileType) {
    console.error(
      `> Bad filetype argument providen: "${fileType}". use json, json5 or jsonc`
    );
    process.exit(1);
  } else if (!parserFound && !fileType) {
    console.error("> No filetype argument providen. use json, json5 or jsonc");
    process.exit(1);
  }

  return fileType;
};

const main = async (argv) => {
  const fileType = getFileTypeFromArgv(argv);
  const parser = getParser(fileType);
  const filePaths = await glob(`**/*.${fileType}`);

  console.log(`> Use '${fileType}' parser on ${filePaths.length} file.`);

  for (const filePath of filePaths) {
    logVerbose(`> parsing of ${filePath}`);
    const _parsed = await parseFile(parser, filePath);
  }

  console.log(`> Successfully parsed ${filePaths.length} ${fileType} files.`);
};

main(process.argv)
  .then((res) => {
    if (res) {
      console.log(res);
    }
  })
  .catch(console.error);
