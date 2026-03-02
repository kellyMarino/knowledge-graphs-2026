import ParserJsonld from "@rdfjs/parser-jsonld";
import ParserN3 from "@rdfjs/parser-n3";
import { createReadStream } from "fs";
import { join } from "path";
import { RdfStore } from "rdf-stores";

const store = RdfStore.createDefault();
const parserN3 = new ParserN3();
const parserJsonld = new ParserJsonld();

function loadFileIntoStore(
  filePath: string,
  format: "ttl" | "jsonld"
): Promise<void> {
  const textStream = createReadStream(filePath, { encoding: "utf-8" });
  const quadStream =
    format === "ttl"
      ? parserN3.import(textStream)
      : parserJsonld.import(textStream);
  return new Promise((resolve, reject) => {
    const imp = store.import(quadStream);
    imp.on("end", () => resolve());
    imp.on("error", reject);
  });
}

async function main() {
  const baseDir = "../";
  const ttlPath = join(baseDir, "data.ttl");
  const jsonldPath = join(baseDir, "data.jsonld");

  await loadFileIntoStore(ttlPath, "ttl");
  await loadFileIntoStore(jsonldPath, "jsonld");

  const quads = store.getQuads();

  console.log("--- All triples (subject, predicate, object) ---\n");
  for (const q of quads) {
    const obj =
      q.object.termType === "Literal"
        ? `"${q.object.value}"${q.object.datatype?.value ? `^^${q.object.datatype.value}` : ""}`
        : q.object.value;
    console.log(`${q.subject.value}\n  → ${q.predicate.value}\n  → ${obj}\n`);
  }

  console.log("--- Total number of triples ---");
  console.log(store.size);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
