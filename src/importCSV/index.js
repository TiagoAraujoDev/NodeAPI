import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ",",
  skip_empty_lines: true,
  from_line: 2
});

const run = async () => {
  const linesParsed = stream.pipe(csvParse);

  for await (let line of linesParsed) {
    const [title, description] = line;

    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });
  }
};

run();
