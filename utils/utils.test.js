const expect = require('expect');
const utils = require('./utils.js');

/*
 * To auto-reload tests whenever editing a line of code:
 * nodemon --exec 'npm test'
 * 
 */

// Behavior-driven development (BDD)
it('should add two numbers', () => {
    var res = utils.add(33, 11);

    expect(res).toBe(44);
    expect(res).toBeA('number');
});

it('should square a number', () => {
    var res = utils.square(4);

    expect(res).toBe(16);
    expect(res).toBeA('number');
})

it('should expect some values', () => {
    expect(12).toBe(12);
    expect({name: 'João'}).toNotEqual({name: 'joão'});
    expect([1, 2, 3]).toInclude(1);
    expect([1, 2, 3]).toExclude(5);
    expect({name: 'João', age: 26}).toInclude({age: 26});
});

it('should set firstName and lastName', () => {
    var user = {location: 'Faro', age: 26};
    res = utils.setName(user, 'João Guerreiro');

    expect(user).toEqual(res);  // objects are passed by reference so user and res have the same value
    expect(res).toIncludeKeys(['firstName', 'lastName']);
    expect(res.firstName).toBe('João');
    expect(res.lastName).toBe('Guerreiro');
});

// Should pass a done argument when testing async functions
it('should async add two numbers', (done) => {
    utils.asyncAdd(2, 3, (sum) => {
        expect(sum).toBe(5).toBeA('number');
        done();
    });
});

it('should async square a number', (done) => {
    utils.asyncSquare(4, (square) => {
        expect(square).toBe(16).toBeA('number');  // chaining multiple tests is possible
        done();
    });
});
