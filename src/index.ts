import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const template = readFileSync(resolve(__dirname, "index.html"), "utf8");

const notes = readFileSync(
  resolve(__dirname, "../A1_Wortliste_Goethe_HUN.notes.txt"),
  "utf8"
)
  .split(/\r?\n/)
  .map((note) => note.split("\t"))
  .filter((note) => note.length === 10)
  .map(
    ([
      type,
      word,
      translation,
      ,
      ,
      wordForms,
      exampleSentence,
      translatedExampleSentence,
      ,
      ,
    ]) => ({
      type,
      word,
      translation,
      wordForms,
      exampleSentence,
      translatedExampleSentence,
    })
  )
  .map(
    ({
      type,
      word,
      translation,
      wordForms,
      exampleSentence,
      translatedExampleSentence,
    }) => `<div class="node">
    <span class="type">${type}</span>
    <span class="word">${word}</span>
    <span class="translation">${translation}</span>
    <span class="wordForms">${wordForms}</span>
    <span class="exampleSentence">${exampleSentence}</span>
    <span class="translatedExampleSentence">${translatedExampleSentence}</span>
</div>`
  )
  .join("\n");

writeFileSync(
  resolve(__dirname, "../A1_Wortliste_Goethe_HUN.notes.html"),
  template.replace(/<\/body>/, `${notes}</body>`),
  "utf8"
);
