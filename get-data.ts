import axios from 'axios';
import * as xml2js from 'xml2js';
import * as fs from "fs";

const parser = xml2js.Parser();

const url = 'https://courses.illinois.edu/cisapp/explorer/catalog/2021/spring/CS.xml?mode=cascade';
async function main() {
  const response = await axios.get(url)
  const text: string = response.data;
  console.log(text.slice(0, 100));

  const xml = await parser.parseStringPromise(text);
  console.log(JSON.stringify(xml, null, 2).slice(0, 1000));

  await fs.promises.writeFile('data.json', JSON.stringify(xml, null, 2));
}

main();
