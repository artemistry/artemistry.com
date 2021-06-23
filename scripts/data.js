const fs = require("fs");
const path = require("path");

function readFile({ route }) {
  const filePath = path.join(__dirname, route);
  const fileContent = fs.readFileSync(filePath, "utf8");

  return fileContent;
}

function writeFile({ directory, content }) {
  const directoryPath = path.join(__dirname, "../docs", directory);
  const filePath = path.join(__dirname, "../docs", directory, "index.html");

  fs.mkdirSync(directoryPath, { recursive: true });
  fs.writeFileSync(filePath, content);
}

function copyFile({ from, to }) {
  const source = path.join(__dirname, from);
  const destination = path.join(__dirname, to);

  fs.copyFileSync(source, destination);
}

function writePhotoshootFiles({ directory, content }) {
  writeFile({ directory, content });
  copyFile({
    from: "../static/photoshoot/styles.css",
    to: `../docs/${directory}/styles.css`,
  });
}

function writeIndexFiles({ content }) {
  const directory = "/";

  writeFile({ directory, content });
  copyFile({
    from: "../static/index/.nojekyll",
    to: `../docs/${directory}/.nojekyll`,
  });
  copyFile({
    from: "../static/index/CNAME",
    to: `../docs/${directory}/CNAME`,
  });
  copyFile({
    from: "../static/index/robots.txt",
    to: `../docs/${directory}/robots.txt`,
  });
  copyFile({
    from: "../static/index/styles.css",
    to: `../docs/${directory}/styles.css`,
  });
  copyFile({
    from: "../static/index/yall-2.1.0.min.js",
    to: `../docs/${directory}/yall-2.1.0.min.js`,
  });
  copyFile({
    from: "../static/index/placeholder.png",
    to: `../docs/${directory}/placeholder.png`,
  });
}

function writeAllFiles({ content }) {
  const directory = "/all";

  writeFile({ directory, content });
  copyFile({
    from: "../static/all/styles.css",
    to: `../docs/${directory}/styles.css`,
  });
  copyFile({
    from: "../static/all/yall-2.1.0.min.js",
    to: `../docs/${directory}/yall-2.1.0.min.js`,
  });
  copyFile({
    from: "../static/all/placeholder.png",
    to: `../docs/${directory}/placeholder.png`,
  });
}

function writeAboutFiles({ content }) {
  const directory = "/about";

  writeFile({ directory, content });
  copyFile({
    from: "../static/about/styles.css",
    to: `../docs/${directory}/styles.css`,
  });
}

function deleteDocsDirectory() {
  const directoryPath = path.join(__dirname, "../docs");

  fs.rmdirSync(directoryPath, { recursive: true });
}

module.exports = {
  readFile,
  writeIndexFiles,
  writeAllFiles,
  writeAboutFiles,
  writePhotoshootFiles,
  deleteDocsDirectory,
};
