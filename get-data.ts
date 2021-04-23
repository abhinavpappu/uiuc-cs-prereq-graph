import axios from 'axios';
import * as xml2js from 'xml2js';
import * as fs from "fs";

const parser = xml2js.Parser();

const url = 'https://courses.illinois.edu/cisapp/explorer/catalog/2021/fall/CS.xml?mode=cascade';
async function main() {
  const response = await axios.get(url)
  const text: string = response.data;

  const xml = await parser.parseStringPromise(text);

  await fs.promises.writeFile('data.json', JSON.stringify(xml, null, 2));
}

main();
