const {
  readFile,
  writeIndexFiles,
  writeAboutFiles,
  writePhotoshootFiles,
  deleteDocsDirectory,
} = require("./data");
const { compileCssForAllPages } = require("./scss");
const {
  setTitleInHtmlString,
  setCopyrightInHtmlString,
  setAnalyticsInHtmlString,
  setNameInHtmlString,
  setDescriptionInHtmlString,
  setNavigationInHtmlString,
  setImagesInHtmlString,
  setParagraphsInHtmlString,
  setSlugInHtmlString,
  setPreviousPageInHtmlString,
  setNextPageInHtmlString,
  setShortDescriptionInHtmlString,
  setIndexPhotoshootsInHtmlString,
  prettifyHtml,
} = require("./view");

function generatePhotoshootPage({
  photoshoot,
  previousPhotoshoot,
  nextPhotoshoot,
}) {
  const { slug, title, images, paragraphs } = photoshoot;

  const config = JSON.parse(readFile({ route: "../data/global.config.json" }));
  let page = readFile({ route: "../templates/pages/photoshoot.html" });

  page = setTitleInHtmlString({
    content: title,
    htmlString: page,
  });

  const analytics = readFile({
    route: "../templates/partials/analytics.html",
  });

  page = setAnalyticsInHtmlString({
    content: analytics,
    htmlString: page,
  });

  const copyright = readFile({
    route: "../templates/partials/copyright.html",
  });

  page = setCopyrightInHtmlString({
    content: copyright,
    htmlString: page,
  });

  page = setNameInHtmlString({
    content: config.name,
    htmlString: page,
  });

  page = setDescriptionInHtmlString({
    content: config.description,
    htmlString: page,
  });

  const navigation = readFile({
    route: "../templates/partials/navigation.html",
  });

  page = setNavigationInHtmlString({
    content: navigation,
    htmlString: page,
  });

  page = setImagesInHtmlString({
    content: images,
    htmlString: page,
  });

  page = setParagraphsInHtmlString({
    content: paragraphs,
    htmlString: page,
  });

  page = setSlugInHtmlString({
    content: slug,
    htmlString: page,
  });

  page = setNextPageInHtmlString({
    nextPhotoshoot,
    htmlString: page,
  });

  page = setPreviousPageInHtmlString({
    previousPhotoshoot,
    htmlString: page,
  });

  page = prettifyHtml(page);

  writePhotoshootFiles({ directory: slug, content: page });
}

function filterByPublishedOnHomePage(photoshoots) {
  return photoshoots.filter((photoshoot) => photoshoot.isPublishedOnHomePage);
}

function generatePhotoshootPages() {
  let photoshoots = JSON.parse(
    readFile({ route: "../data/photoshoots.data.json" })
  );

  photoshoots.forEach((photoshoot, index) => {
    const nextPhotoshoot = photoshoots[index + 1];
    let previousPhotoshoot = null;

    if (index > 0) {
      previousPhotoshoot = photoshoots[index - 1];
    }

    generatePhotoshootPage({ photoshoot, previousPhotoshoot, nextPhotoshoot });
  });
}

function generateIndexPage() {
  let photoshoots = JSON.parse(
    readFile({ route: "../data/photoshoots.data.json" })
  );
  photoshoots = filterByPublishedOnHomePage(photoshoots);

  const config = JSON.parse(readFile({ route: "../data/global.config.json" }));
  let page = readFile({ route: "../templates/pages/index.html" });

  page = setTitleInHtmlString({
    content: config.description,
    htmlString: page,
  });

  const analytics = readFile({
    route: "../templates/partials/analytics.html",
  });

  page = setAnalyticsInHtmlString({
    content: analytics,
    htmlString: page,
  });

  const copyright = readFile({
    route: "../templates/partials/copyright.html",
  });

  page = setCopyrightInHtmlString({
    content: copyright,
    htmlString: page,
  });

  page = setNameInHtmlString({
    content: config.name,
    htmlString: page,
  });

  page = setDescriptionInHtmlString({
    content: config.description,
    htmlString: page,
  });

  page = setShortDescriptionInHtmlString({
    content: config.shortDescription,
    htmlString: page,
  });

  const navigation = readFile({
    route: "../templates/partials/navigation.html",
  });

  page = setNavigationInHtmlString({
    content: navigation,
    htmlString: page,
  });

  page = setIndexPhotoshootsInHtmlString({
    content: photoshoots,
    htmlString: page,
  });

  writeIndexFiles({ content: page });
}

function generateAboutPage() {
  const config = JSON.parse(readFile({ route: "../data/global.config.json" }));
  let page = readFile({ route: "../templates/pages/about.html" });

  page = setTitleInHtmlString({
    content: config.description,
    htmlString: page,
  });

  const analytics = readFile({
    route: "../templates/partials/analytics.html",
  });

  page = setAnalyticsInHtmlString({
    content: analytics,
    htmlString: page,
  });

  const copyright = readFile({
    route: "../templates/partials/copyright.html",
  });

  page = setCopyrightInHtmlString({
    content: copyright,
    htmlString: page,
  });

  page = setNameInHtmlString({
    content: config.name,
    htmlString: page,
  });

  page = setDescriptionInHtmlString({
    content: config.description,
    htmlString: page,
  });

  page = setShortDescriptionInHtmlString({
    content: config.shortDescription,
    htmlString: page,
  });

  const navigation = readFile({
    route: "../templates/partials/navigation.html",
  });

  page = setNavigationInHtmlString({
    content: navigation,
    htmlString: page,
  });

  writeAboutFiles({ content: page });
}

function main() {
  deleteDocsDirectory();
  compileCssForAllPages();
  generatePhotoshootPages();
  generateIndexPage();
  generateAboutPage();
}

main();
