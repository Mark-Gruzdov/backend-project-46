#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format');
  //.argument('<filepath1>', 'first filepath')
  //.argument('<filepath2>', 'second filepath');


  program.parse();