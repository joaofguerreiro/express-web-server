const expect = require('expect');
const rewire = require('rewire');  // Allow monkey-patching

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);  // Replace db object on app.js with a spy
    
    // A test spy is an object that records its interaction with other objects throughout the code base
    // Test spies are useful to test both callbacks and how certain functions are used
    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('João', 26);
        expect(spy).toHaveBeenCalledWith('João', 26);
    });

    it('sould call saveUser with user object', () => {
        var email = 'joao@example.com';
        var password = '123123';

        app.handleSignup(email, password);  // saveUser inside this function is actually a Spy object
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });

});
 