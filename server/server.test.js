const request = require('supertest');
const expect = require('expect');
var app = require('./server.js').app;

// Testing express endpoints
describe('Server', () => {
    
    describe('GET /error', () => {
        it('should return 404 response', (done) => {
            request(app)
            .get('/error')
            .expect({
                error: 'Object not found'
            })
            .expect((res) => {
                expect(res.body).toIncludeKey('error');
            })
            .expect(404)
            .end(done);
        });
    });

    describe('GET /users', () => {
        it('should return my user', (done) => {
            request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    name: 'João',
                    age: 26
                })
            })
            .end(done);
        });
    });

});
