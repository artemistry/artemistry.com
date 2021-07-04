const prettier = require("prettier");

function setTitleInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(/<%% title %%>/gi, content);

  return updatedHtmlString;
}

function setImagesInHtmlString({ content, htmlString }) {
  let images = "";

  content.forEach((image) => {
    images = `${images}
      <p class="text-center">
        <img
          src="${image}"
          alt="Artemistry Photography"
        />
      </p>
    `;
  });

  const updatedHtmlString = htmlString.replace(/<%% images %%>/gi, images);

  return updatedHtmlString;
}

function setParagraphsInHtmlString({ content, htmlString }) {
  let paragraphs = "";

  content.forEach((paragraph) => {
    paragraphs = `${paragraphs}
      <p>
        ${paragraph}
      </p>
    `;
  });

  const updatedHtmlString = htmlString.replace(
    /<%% paragraphs %%>/gi,
    paragraphs
  );

  return updatedHtmlString;
}

function setAnalyticsInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(/<%% analytics %%>/gi, content);

  return updatedHtmlString;
}

function setCopyrightInHtmlString({ content, htmlString }) {
  let updatedHtmlString = htmlString.replace(/<%% copyright %%>/gi, content);
  updatedHtmlString = updatedHtmlString.replace(
    /<%% year %%>/gi,
    new Date().getFullYear()
  );

  return updatedHtmlString;
}

function setSlugInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(/<%% slug %%>/gi, content);

  return updatedHtmlString;
}

function setPreviousPageInHtmlString({ previousPhotoshoot, htmlString }) {
  if (!previousPhotoshoot) {
    return htmlString.replace(/<%% previousPage %%>/gi, "");
  }

  const { slug, title } = previousPhotoshoot;

  const previousPage = `
    <p class="go-previous">
      Previous: <br />
      <a href="/${slug}/">${title}</a>
    </p>
  `;

  const updatedHtmlString = htmlString.replace(
    /<%% previousPage %%>/gi,
    previousPage
  );

  return updatedHtmlString;
}

function setNextPageInHtmlString({ nextPhotoshoot, htmlString }) {
  if (!nextPhotoshoot) {
    return htmlString.replace(/<%% nextPage %%>/gi, "");
  }

  const { slug, title } = nextPhotoshoot;

  const nextPage = `
    <p class="go-next">
      Next: <br />
      <a href="/${slug}/">${title}</a>
    </p>
  `;

  const updatedHtmlString = htmlString.replace(/<%% nextPage %%>/gi, nextPage);

  return updatedHtmlString;
}

function setNameInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(/<%% name %%>/gi, content);

  return updatedHtmlString;
}

function setDescriptionInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(
    /<%% description %%>/gi,
    content
  );

  return updatedHtmlString;
}

function setShortDescriptionInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(
    /<%% shortDescription %%>/gi,
    content
  );

  return updatedHtmlString;
}

function setNavigationInHtmlString({ content, htmlString }) {
  const updatedHtmlString = htmlString.replace(/<%% navigation %%>/gi, content);

  return updatedHtmlString;
}

// function setIndexPhotoshootsInHtmlString({ content, htmlString }) {
//   let photoshoots = "";

//   // content.forEach((photoshoot) => {
//   //   const images = photoshoot.images.reduce((result, image) => {
//   //     return `${result}
//   //       <a href="/${photoshoot.slug}/" class="border-bottom-0">
//   //         <img src="/placeholder.png" data-src="${image}" alt="Artemistry Photography" loading="lazy" class="lazy">
//   //       </a>
//   //     `;
//   //   }, "");

//   //   photoshoots = `${photoshoots}
//   //     <div class="col-md-8 offset-md-2 mt-5 mb-5">
//   //       <div class="feature">
//   //         <h3>
//   //         <a href="/${photoshoot.slug}/">${photoshoot.title}</a>
//   //         </h3>
//   //         ${images}
//   //       </div>
//   //     </div>
//   //   `;
//   // });

//   content.forEach((photoshoot) => {
//     photoshoots = `${photoshoots}
//       <div class="col-md-8 offset-md-2 mt-5 mb-5">
//         <div class="feature">
//           <h3>
//             <a href="/${photoshoot.slug}/">${photoshoot.title}</a>
//           </h3>
//           <a href="/${photoshoot.slug}/" class="border-bottom-0">
//             <img src="/placeholder.png" data-src="${photoshoot.images[0]}" alt="Artemistry Photography" loading="lazy" class="lazy">
//           </a>
//         </div>
//       </div>
//     `;
//   });

//   const updatedHtmlString = htmlString.replace(
//     /<%% photoshoots %%>/gi,
//     photoshoots
//   );

//   return updatedHtmlString;
// }

function replaceJpgWithWebp(file) {
  const filePath = file.replace(".jpg", "");
  const webpPath = `${filePath}.webp`;

  return webpPath;
}

function replaceJpgWithPng(file) {
  const filePath = file.replace(".jpg", "");
  const webpPath = `${filePath}.png`;

  return webpPath;
}

function setAllPhotoshootsInHtmlString({ content, htmlString }) {
  let allImages = "";

  content.forEach((photoshoot) => {
    const images = photoshoot.images.reduce((result, image) => {
      const webpImage = replaceJpgWithWebp(image);
      const pngPlaceholderImage = "/placeholder.png";

      // return `${result}
      //   <a href="/${photoshoot.slug}/" class="border-bottom-0 photo">
      //     <img src="${webpImage}" alt="Artemistry Photography" loading="lazy">
      //   </a>
      // `;

      return `${result}
        <a href="/${photoshoot.slug}/" class="border-bottom-0 photo">
          <img src="${pngPlaceholderImage}" data-src="${webpImage}" alt="Artemistry Photography" class="lazy" width="800">
        </a>
      `;

      // return `${result}
      //   <a href="/${photoshoot.slug}/" class="border-bottom-0 photo">
      //     <img src="${webpImage}" alt="Artemistry Photography">
      //   </a>
      // `;
    }, "");

    // allImages = `${allImages}
    //   <div class="col-md-12">
    //     <div class="photos">
    //       ${images}
    //     </div>
    //   </div>
    // `;

    allImages = `${allImages}${images}`;

    // photoshoots = `${photoshoots}
    //   <div class="col-md-8 offset-md-2 mt-5 mb-5">
    //     <div class="feature">
    //       <h3>
    //         <a href="/${photoshoot.slug}/">${photoshoot.title}</a>
    //       </h3>
    //       ${images}
    //     </div>
    //   </div>
    // `;
  });

  // content.forEach((photoshoot) => {
  //   photoshoots = `${photoshoots}
  //     <div class="col-md-8 offset-md-2 mt-5 mb-5">
  //       <div class="feature">
  //         <h3>
  //           <a href="/${photoshoot.slug}/">${photoshoot.title}</a>
  //         </h3>
  //         <a href="/${photoshoot.slug}/" class="border-bottom-0">
  //           <img src="/placeholder.png" data-src="${photoshoot.images[0]}" alt="Artemistry Photography" loading="lazy" class="lazy">
  //         </a>
  //       </div>
  //     </div>
  //   `;
  // });

  const photoshoots = `
    <div class="col-md-12">
      <div class="photos">
        ${allImages}
      </div>
    </div>
  `;

  // const photoshoots = allImages;

  const updatedHtmlString = htmlString.replace(
    /<%% photoshoots %%>/gi,
    photoshoots
  );

  return updatedHtmlString;
}

const setIndexPhotoshootsInHtmlString = setAllPhotoshootsInHtmlString;

function prettifyHtml(html) {
  return prettier.format(html, { parser: "html" });
}

module.exports = {
  setCopyrightInHtmlString,
  setAnalyticsInHtmlString,
  setTitleInHtmlString,
  setNameInHtmlString,
  setDescriptionInHtmlString,
  setShortDescriptionInHtmlString,
  setNavigationInHtmlString,
  setImagesInHtmlString,
  setParagraphsInHtmlString,
  setSlugInHtmlString,
  setPreviousPageInHtmlString,
  setNextPageInHtmlString,
  setIndexPhotoshootsInHtmlString,
  setAllPhotoshootsInHtmlString,
  prettifyHtml,
};
