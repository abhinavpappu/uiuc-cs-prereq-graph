declare module 'xml2js';

type ParserFunctions = {
  parseStringPromise: (xml: string) => Promise<object>;
}

export function Parser(): ParserFunctions;