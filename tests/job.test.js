const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Job = require("../src/models/job");

const jobOne = {
    title: "11Software Engineer",
    location: "Fremont, CA",
    company: "PDDN",
    url: "https://www.linkedin.com/jobs/view/11software-engineer-at-pddn-1928329197",
    ago: "2 months ago",
    applicants: "Be among the first 25 applicants",
    text: "Test text"
};

beforeAll(async () => {
    await Job.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should create new job posting', async () => {
    const response = await request(app)
        .post("/jobs")
        .send(jobOne)
    expect(response.statusCode).toBe(201)
})

test('Should run python code', () => {
    const { spawn } = require("child_process");
    const pyProg = spawn("python", ["./hello.py"]);

    pyProg.stdout.on("data", function (data) {
        expect(data.toString()).toBe('Hello')
    });
})
