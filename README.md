# join-json

Merges multiple JSON objects or arrays together.  Can be used as node module or from command-line.

```bash
npm install join-json
```
## Node usage

```javascript
const JoinJSON = require('join-json');

const joinjson = new JoinJSON();
joinjson.join([{a: 1}]);
joinjson.join([{b: 2}]);
console.log(joinjson.join([{c: 3}]));
```
## Command-line usage

### Usage
```
Usage: join-retire [options]

Options:
   -i, --include   JSON file to include
   -o, --out       The combined JSON file to write.  If not specified, writes out stdout.
   -f, --force     Forces overwrite of `output` if it exists
   -h, --help      This usage
```

### Example

```bash
join-json -i a.json -i b.json -o out.json -f
```

## License

MIT
