#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
	.description('Test commander script')
	.version('1.0.0', '-v, --version')
	.usage('[OPTIONS]...')
	.argument('<input>', 'Input direcorty for the generated images')
	.argument(
		'<size>',
		'Size in pixels that output images are fitted in. Size needs to be specified in format: WIDTHxHEIGHT'
	)
	.argument('<output>', 'Output direcorty for the generated images')
	.option(
		'-s, --suffix <value>',
		'Suffix that gets appended to each file name'
	)
	.parse(process.argv);

const options = program.opts();

console.log('All opts', program.opts(), program.args);
