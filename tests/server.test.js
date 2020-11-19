const request = require('supertest');
const app = require('../server/app.js');
const regeneratorRuntime = require("regenerator-runtime");

describe('API TESTING', () => {

  test('/api/camps/:id/calendar', async (done) => {
    const response = await request(app).get('/api/camps/1/calendar');
    expect(response.status).toBe(200);
    done();
  });

  test('/api/camps/:id/reservation', async (done) => {
    const response = await request(app).get('/api/camps/1/reservation');
    expect(response.status).toBe(200);
    done();
  });

});
