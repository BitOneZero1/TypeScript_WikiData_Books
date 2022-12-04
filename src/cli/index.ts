#!/usr/bin/env node

// bundle this
// pnpm esbuild src/cli/index.ts --bundle --minify --platform=node --target=node18 --outfile=plotdiffwork

import { logger } from '../lib/system/logger';
import sade from 'sade';

import * as wikidata_bot from "./wikidata_bot_2";
import * as goodreads_bot from "./goodreads_bot";
import * as wikiDataSearch from '../lib/wikidata/wikidata_search'


const prog = sade('WikiData_Books_cli');
prog.version('0.0.1');


type SadeOptionItem = {
  flag: string;
  description?: string;
  value?: sade.Value;
};

type Cmd = { command: string; describe: string; examples?: string[]; options?: SadeOptionItem[]; action: sade.Handler };

const commands = [
  {
    command: 'goodreads-book-test-a',
    describe: 'Test goodreads scraping',
    examples: [
      ],
    action: goodreads_bot.doGoodReadsOne,
  },
  {
    command: 'goodreads-book-series-a',
    describe: 'Start with a GoodReads series and work down to books and book editions.',
    examples: [
      ],
    action: wikidata_bot.goodreads_book_series_a,
  },
  {
    command: 'wikidata-query-author <q-for-author>',
    describe: 'Search WikiData for Q items with author Q',
    examples: [
      ],
    action: wikidata_bot.wikiDataQueryAuthor,
  },
  {
    command: 'wikidata-search-book-title <title-string>',
    describe: 'search WikiData for a book by label names on Q items. Case sensitive. For common words it at least helps filter through books from non-books if you believe title is exact match.',
    examples: [
      'wikidata-search-book-title \'One Summer\'',
      ],
    action: wikidata_bot.wikidata_search_book_test0,
  },
  {
    command: 'wikidata-search-books-by-author <Author_QItem>',
    describe: 'search WikiData for all books that have author filed with specified Q items.',
    examples: [
      'wikidata-search-books-by-author Q42',
      ],
    action: wikiDataSearch.searchWikiDataBookWithAuthor,
  },
];


function enableCommand(cmd: Cmd, prog: sade.Sade) {
  const p = prog.command(cmd.command).describe(cmd.describe);
  if (cmd.examples) cmd.examples.forEach((e) => p.example(e));
  if (cmd.options) cmd.options.forEach((o) => p.option(o.flag, o.description, o.value));
  p.action(cmd.action);
  return p;
}


function enableCommands(cmds: Cmd[], prog: sade.Sade) {
  const p = prog;
  cmds.forEach((cmd) => enableCommand(cmd, p));
  return p;
}


enableCommands(commands, prog).parse(process.argv);
