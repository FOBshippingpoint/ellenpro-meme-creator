import ghpages from "gh-pages";
import fs from "fs";

// Because relative links are not supported by GitHub Pages, we need to replace「="/」 with 「="./」
const indexHtml = fs.readFileSync("./dist/index.html", "utf8");

const regex = /="\//g;
if (regex.test(indexHtml)) {
  console.log("Found relative path in index.html, fixing...");
  const newHtml = indexHtml.replace(/="\//g, '="./');
  console.log("Writing new index.html...");
  fs.writeFileSync("./dist/index.html", newHtml);
  console.log("Done!");
}

console.log("Start publishing...");
ghpages.publish("dist", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Deployed!");
});
