const babel = require("@babel/core");
const plugin = require("./index");
const fs = require("fs");
const path = require("path");

const example1 = fs.readFileSync(
  path.resolve(__dirname, "examples", "example1.js"),
  "utf-8"
);

it("works", () => {
  const { code } = babel.transform(example1, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});
