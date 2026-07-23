// Script to copy generated story images to public/
const fs = require("fs");
const path = require("path");

const srcDir =
  "C:/Users/Lenovo/.gemini/antigravity-ide/brain/012536cf-f8f5-423f-a2bc-24e4d118f1aa";
const dstDir = path.join(__dirname, "public");

const files = [
  ["alang_ship_breaking_1784813066057.png", "story-featured.png"],
  ["future_mariners_1784813079079.png", "story-feature-1.png"],
  ["women_of_sea_1784813091314.png", "story-women.png"],
  ["smart_ports_1784813111697.png", "story-innovation.png"],
  ["alang_dawn_1784813123075.png", "story-drone.png"],
];

files.forEach(([src, dst]) => {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`✓ ${dst}`);
  } else {
    console.warn(`✗ Source not found: ${src}`);
  }
});
console.log("Done.");
