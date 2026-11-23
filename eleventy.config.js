const path = require("path");
const fs = require("fs");
const sass = require("sass");
const nunjucks = require("nunjucks");

function compileSass() {
  const scssPath = path.join(__dirname, "src/scss/main.scss");
  const cssPath = path.join(__dirname, "src/assets/css/main.css");
  const result = sass.compile(scssPath, {
    loadPaths: [path.join(__dirname, "node_modules/govuk-frontend/dist")],
  });
  const previous = fs.existsSync(cssPath)
    ? fs.readFileSync(cssPath, "utf8")
    : null;
  if (previous === result.css) {
    return;
  }
  fs.mkdirSync(path.dirname(cssPath), { recursive: true });
  fs.writeFileSync(cssPath, result.css);
}

module.exports = function (eleventyConfig) {
  const njkEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader([
      path.join(__dirname, "src/_includes"),
      path.join(__dirname, "node_modules/govuk-frontend/dist"),
    ])
  );
  eleventyConfig.setLibrary("njk", njkEnv);

  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.on("eleventy.before", () => {
    compileSass();
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/govuk-frontend/dist/govuk/assets": "assets",
    "node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js":
      "assets/govuk-frontend.min.js",
    "src/assets/css": "assets/css",
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
