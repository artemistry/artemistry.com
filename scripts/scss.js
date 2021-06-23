const sass = require("sass");
const fs = require("fs");
const path = require("path");

function writeFile({ directory, content }) {
  const directoryPath = path.join(__dirname, "../static", directory);
  const filePath = path.join(__dirname, "../static", directory, "styles.css");

  fs.mkdirSync(directoryPath, { recursive: true });
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.writeFileSync(filePath, content);
}

function compileIndexPage() {
  const filePath = path.join(__dirname, "../scss/index.scss");

  const compiled = sass.renderSync({
    file: filePath,
  });

  writeFile({ directory: "./index", content: compiled.css });
}

function compilePhotoshootPage() {
  const filePath = path.join(__dirname, "../scss/photoshoot.scss");

  const compiled = sass.renderSync({
    file: filePath,
  });

  writeFile({ directory: "./photoshoot", content: compiled.css });
}

function compileAboutPage() {
  const filePath = path.join(__dirname, "../scss/about.scss");

  const compiled = sass.renderSync({
    file: filePath,
  });

  writeFile({ directory: "./about", content: compiled.css });
}

function compileCssForAllPages() {
  compileIndexPage();
  compilePhotoshootPage();
  compileAboutPage();
}

module.exports = {
  compileCssForAllPages,
};
