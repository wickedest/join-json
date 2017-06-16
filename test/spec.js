const expect = require('chai').expect;
const JoinJSON = require('../index.js');
const path = require('path');

describe('join-json', () => {
	it('exports', () => {
		expect(JoinJSON).to.exist;
	});
	it('joins arrays', () => {
		const joinjson = new JoinJSON();
		joinjson.join([3]);
		joinjson.join([2]);
		expect(joinjson.join([1])).to.deep.equal([3,2,1]);
	});
	it('joins objects', () => {
		const joinjson = new JoinJSON();
		joinjson.join([{c: 3}]);
		joinjson.join([{b: 2}]);
		expect(joinjson.join([{a: 1}])).to.deep.equal([{c: 3}, {b: 2}, {a: 1}]);
	});
	it('fails to join json of different types', () => {
		const joinjson = new JoinJSON();
		joinjson.join([{c: 3}]);
		joinjson.join([{b: 2}]);
		expect(() => {
			joinjson.join({a: 1})
		}).to.throw(TypeError);
	});
	it('joins arrays from files', () => {
		const joinjson = new JoinJSON();
		joinjson.joinFile(path.join('test', 'a.json'));
		expect(joinjson.joinFile(path.join('test', 'b.json')))
			.to.deep.equal([{a: 1}, {b: 2}]);
	});
	it('joins objects from files', () => {
		const joinjson = new JoinJSON();
		joinjson.joinFile(path.join('test', 'c.json'));
		expect(joinjson.joinFile(path.join('test', 'd.json')))
			.to.deep.equal({a: 1, b: 2});
	});
	it('joins a mix of file and memory', () => {
		const joinjson = new JoinJSON();
		joinjson.join({a: 1});
		expect(joinjson.joinFile(path.join('test', 'd.json')))
			.to.deep.equal({a: 1, b: 2});
	});
	it('fails to joins when undefined', () => {
		const joinjson = new JoinJSON();
		expect(() => { joinjson.join(); }).to.throw(Error);
	});
	it('fails to joins when number', () => {
		const joinjson = new JoinJSON();
		expect(() => { joinjson.join(1); }).to.throw(TypeError);
	});
	it('fails to joins when boolean', () => {
		const joinjson = new JoinJSON();
		expect(() => { joinjson.join(true); }).to.throw(TypeError);
	});
});
