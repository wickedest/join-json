#! /usr/bin/env node

const fs = require('fs');

class JoinJSON {
	join(json) {
		if (typeof (json) !== 'object') {
			throw new TypeError(`Unexpected type: ${typeof (json)}`);
		}
		const isArray = json instanceof Array;
		if (this.joinIsArray !== undefined && isArray !== this.joinIsArray) {
			throw new TypeError(`Join types differ, expected ${this.joinIsArray ? 'array' : 'object'}`);
		}
		this.joinIsArray = isArray;
		if (isArray) {
			if (this.joined) {
				this.joined = this.joined.concat(json);
			} else {
				this.joined = json;
			}
		}
		else {
			this.joined = Object.assign(this.joined || json, json);
		}
		return this.joined;
	}

	joinFile(file) {
		const exists = fs.existsSync(file);
		if (!exists) {
			throw new Error(`File does not exist: ${file}`);
		}
		const json = JSON.parse(fs.readFileSync(file));
		if (!json) {
			// empty but not error
			return;
		}
		return this.join(json);
	}
}

exports = module.exports = JoinJSON;
