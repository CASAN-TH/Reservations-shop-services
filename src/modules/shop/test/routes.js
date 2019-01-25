'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Shop = mongoose.model('Shop');

var credentials,
    token,
    mockup;

describe('Shop CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: 'name',
            image: 'image.jpg',
            imagereview: ['image.jpg', 'image1.jpg', 'image2.jpg'],
            descreiption: {
                title: "ข้อมูลของร้าน 1",
                detail: "อร่อยมาก",
            },
            house_no: 'house_no',
            village: 'village',
            subdistrict: 'subdistrict',
            district: 'district',
            province: 'province',
            postalcode: 'postalcode'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Shop get use token', (done) => {

        var shop1 = new Shop({
            name: 'name',
            image: 'image.jpg',
            imagereview: ['image.jpg', 'image1.jpg', 'image2.jpg'],
            descreiption: {
                title: "ข้อมูลของร้าน 1",
                detail: "อร่อยมาก",
            },
            address_id: "564646d54f4s68d4f"
        });
        shop1.save(function (err, sh1) {
            request(app)
                .get('/api/shops')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    var resp = res.body;
                    done();
                });
        });
    });

    it('should be Shop get by id', function (done) {



        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/shops/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.image, mockup.image);
                        assert.equal(resp.data.imagereview.length, 3);
                        assert.equal(resp.data.descreiption.title, mockup.descreiption.title);
                        assert.equal(resp.data.descreiption.detail, mockup.descreiption.detail);
                        assert.equal(resp.data.address_id, mockup.address_id);

                        assert.equal(resp.data.house_no, mockup.house_no);
                        assert.equal(resp.data.village, mockup.village);
                        assert.equal(resp.data.subdistrict, mockup.subdistrict);
                        assert.equal(resp.data.district, mockup.district);
                        assert.equal(resp.data.province, mockup.province);
                        assert.equal(resp.data.postalcode, mockup.postalcode);

                        done();
                    });
            });

    });

    it('should be Shop post use token', (done) => {
        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                done();
            });
    });

    it('should be shop put use token', function (done) {

        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/shops/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.name, update.name);
                        done();
                    });
            });

    });

    it('should be shop delete use token', function (done) {

        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shops/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be shop get not use token', (done) => {
        request(app)
            .get('/api/shops')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be shop post not use token', function (done) {

        request(app)
            .post('/api/shops')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be shop put not use token', function (done) {

        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/shops/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be shop delete not use token', function (done) {

        request(app)
            .post('/api/shops')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shops/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Shop.remove().exec(done);
    });

});