const fs = require("fs");
const path = require("path");
const moment = require("moment");
const prettier = require("prettier");

function readOptionTradesDataFile() {
  const filePath = path.join(__dirname, "../old_docs");
  const fileAndDirectories = fs.readdirSync(filePath);
  const directories = fileAndDirectories.filter((fileOrDirectory) => {
    const filePath = path.join(__dirname, "../old_docs", fileOrDirectory);

    return fs.lstatSync(filePath).isDirectory();
  });
  const publishedDirectories = directories.filter((directory) => {
    return directory.slice(0, 2) !== "__";
  });

  return publishedDirectories;
}

function getPhotoUrlsFromHtml(html) {
  const regex = /https:\/\/bitbucket.org\/artemistry\/artemistry.com\/raw\/[a-zA-Z0-9\/\-%_.]+/g;

  const result = html.match(regex);

  return result;
}

function getHeaderFromHtml(html) {
  const regex = /<h1>[?!&A-Za-z0-9-,'’ ]+<\/h1>/g;

  const result = html.match(regex);

  if (result) {
    const title = result[0].replace("<h1>", "").replace("</h1>", "");

    return title;
  }

  return null;
}

function getModelFromHtml(html) {
  const regex = /<p class="d-none">[\s]*Model:[\w\W\d\D\s]+?(?=<\/p>)/g;

  const result = html.match(regex);

  if (result) {
    let model = result[0];

    model = model
      .replace('<p class="d-none">\n            Model: <br />\n', "")
      .replace("\n", "")
      .replace(
        '<a href="https://www.instagram.com/chrissy_vav/">Chrissy</a>',
        ""
      )
      .replace(
        '<a href="https://www.itsalwaysmargi.com"              >Margherita Luisa-Rosa Barbieri</a\n            >',
        ""
      )
      .replace(
        '<p class="d-none">              Model: <br />\n              ',
        ""
      )
      .trim();

    return model;
  }

  return null;
}

function getModelFromImageUrls(imageUrls) {
  const regex = /%20[A-Za-z0-9%-]+/g;

  if (!imageUrls) {
    return null;
  }

  const result = imageUrls[0].match(regex);

  if (result) {
    let model = result[0];

    model = model.replace(/%20/g, " ").trim();

    return model;
  }

  return null;
}

function getDateFromImageUrls(imageUrls) {
  if (!imageUrls) {
    return null;
  }

  const regex = /photos\/[0-9]{4}\/([0-9-]+)%20/g;
  const match = regex.exec(imageUrls[0]);

  return match[1];
}

function prettifyJson(json) {
  return prettier.format(json, { parser: "json" });
}

const NON_PHOTOSHOOT_PAGES = [
  "artist",
  "bikini-photoshoot",
  "blog",
  "book-your-photoshoot",
  "books-for-photographers",
  "boudoir",
  "change",
  "collaboration",
  "confidence-photoshoot",
  "contact",
  "courage",
  "dangerous",
  "experience",
  "education",
  "faces-photoshoot",
  "fashion",
  "films",
  "how-to-become-a-better-model",
  "how-to-become-a-better-womens-photographer",
  "ideas",
  "if-i-had-a-billion-dollars",
  "inspiration",
  "kindness",
  "lessons",
  "lingerie",
  "manifesto",
  "model-tests",
  "motion",
  "my-advice-to-new-models",
  "no-names",
  "outfits",
  "photographer",
  "poetry",
  "projects",
  "published",
  "sensation-photoshoot",
  "services",
  "should-you-model-naked",
  "should-you-model-nude",
  "stories",
  "swimwear",
  "three-books-every-womens-photographer-must-read",
  "whats-cool",
  "when-your-model-cancels",
  "women",
  "you",
];

function parseAllDirectories(directories) {
  const data = directories.reduce((result, directory) => {
    const filePath = path.join(
      __dirname,
      "../old_docs",
      directory,
      "index.html"
    );
    const file = fs.readFileSync(filePath, "utf8");
    const imageUrls = getPhotoUrlsFromHtml(file);
    const title = getHeaderFromHtml(file);
    // const modelFromHtml = getModelFromHtml(file);
    const modelFromImageUrls = getModelFromImageUrls(imageUrls);
    const createdOn = getDateFromImageUrls(imageUrls);

    // const model = modelFromHtml ? modelFromHtml : modelFromImageUrls;

    if (NON_PHOTOSHOOT_PAGES.includes(directory)) {
      return result;
    }

    // if (title === null) {
    //   return result;
    // }

    // if (!imageUrls) {
    //   return result;
    // }

    // if (imageUrls === null && model === null) {
    //   return result;
    // }

    return [
      ...result,
      {
        title,
        images: imageUrls,
        credits: {
          photographer: "Artemistry",
          model: modelFromImageUrls,
        },
        slug: directory,
        createdOn,
      },
    ];
  }, []);

  const dataSortedByDate = data.sort((a, b) => {
    if (
      moment(a.createdOn, "YYYY-MM-DD").isBefore(
        moment(b.createdOn, "YYYY-MM-DD")
      )
    ) {
      return 1;
    }

    if (
      moment(a.createdOn, "YYYY-MM-DD").isAfter(
        moment(b.createdOn, "YYYY-MM-DD")
      )
    ) {
      return -1;
    }

    return 0;
  });

  return dataSortedByDate;
}

function writeDataToJsonFile(data) {
  const json = prettifyJson(JSON.stringify(data));
  const filePath = path.join(__dirname, "../data", "photoshoots.data.json");

  fs.writeFileSync(filePath, json);
}

function generateDataJsonFileFromDocs() {
  const directories = readOptionTradesDataFile();
  const data = parseAllDirectories(directories);

  writeDataToJsonFile(data);
}

generateDataJsonFileFromDocs();
