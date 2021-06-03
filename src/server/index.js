const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const port = 4040;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// recieve and save documents of the applications
// Dev screen will be the way to actually create the projects
//    maybe it will actually accept the application doc as input
app.post("/application", async (req, res) => {
  console.log(req.body);
  let returnQuery = "";
  if (req.body.github == "") {
    const githubMissing = encodeURI("Invalid Submission: Github URL missing");
    returnQuery = `?status=400&message=${githubMissing}`;
  } else {
    try {
      const fileName = req.body.github.replace(/\//g, "_");
      await fs.writeFile(
              path.join(__dirname, `./data/projects/${fileName}.json`),
              JSON.stringify(req.body)
            );
      const success = encodeURI("Application submitted successfully.");
      returnQuery = `?status=200&message=${success}`;
    } catch (err) {
      console.error("Error writing submission file", err);
    }
  }
  res.redirect(`/apply${returnQuery}`);
});


app.listen(port, () => {
  // tslint:disable-next-line:no-console
    console.log(`server started at ${port}`);
});
