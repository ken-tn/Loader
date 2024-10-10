const fs = require("fs");
const JsConfuser = require("js-confuser");

// Read the list of files from obfuscatelist.txt
const fileListPath = "obfuscatelist.txt";
fs.readFile(fileListPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading obfuscatelist.txt:", err);
    return;
  }

  // Split the file into an array of file names
  const fileNames = data.split(/\r?\n/).filter(Boolean);

  // Process each file
  fileNames.forEach((fileName) => {
    // Read the content of the JavaScript file
    fs.readFile(fileName, "utf8", (err, jsSource) => {
      if (err) {
        console.error(`Error reading file ${fileName}:`, err);
        return;
      }

      // Obfuscate the JavaScript content
      JsConfuser.obfuscate(jsSource, {
        target: "browser",
        preset: "high",
      }).then(obfuscated => {
        // Overwrite the original file with obfuscated content
        fs.writeFile(fileName, obfuscated, (err) => {
          if (err) {
            console.error(`Error writing obfuscated file ${fileName}:`, err);
          } else {
            console.log(`Successfully obfuscated and saved ${fileName}`);
          }
        });
      }).catch(err => {
        console.error(`Error obfuscating file ${fileName}:`, err);
      });
    });
  });
});
