# join-json

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

```bash
join-json -i a.json -i b.json -o out.json -f
```
