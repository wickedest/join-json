const fs = require('fs');
const JoinJSON = require('../index.js');
const nomnom = require('nomnom');
const options = nomnom
	.script('join-retire')
	.options({
		'include': {
			abbr: 'i',
			help: 'JSON file to include',
			list: true
		},
		'out': {
			abbr: 'o',
			help: 'The combined JSON file to write.  If not specified, writes out stdout.'
		},
		'force': {
			abbr: 'f',
			help: 'Forces overwrite of `output` if it exists',
			flag: true
		},
		'help': {
			abbr: 'h',
			help: 'This usage',
			flag: true
		}
	})

const opts = options.parse();

if (!opts.include || !opts.include.length) {
	options.parse(['-h']);
	process.exit(-1);
}

if (fs.existsSync(opts.out) && !opts.force) {
	console.error(`Output file already exists: ${opts.out}`);
	process.exit(-1);
}

const joinjson = new JoinJSON();
let joined;

opts.include.forEach(file => {
	joined = joinjson.joinFile(file);
});

if (!opts.out) {
	console.log(JSON.stringify(joined));
}
else {
	fs.writeFileSync(opts.out, JSON.stringify(joined));
}
process.exit(0);
