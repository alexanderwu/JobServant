const request = require('supertest');
const app = require('../src/app');
const Job = require('../src/models/job');
const {
  jobTwo, setupDatabase, teardownDatabase,
} = require('./fixtures/db');

/* global beforeEach, afterAll, test, expect */
/* eslint no-undef: "error" */
beforeEach(setupDatabase);

afterAll(teardownDatabase);

test('Should return jobs', async () => {
  await request(app).get('/jobs').expect(200);
});

test('Should create new job posting', async () => {
  const response = await request(app)
    .post('/jobs')
    .send(jobTwo)
    .expect(201);
  const job = await Job.findById(response.body._id);
  expect(job).not.toBeNull();
});
