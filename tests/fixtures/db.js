const mongoose = require('mongoose');
const Job = require('../../src/models/job');

const jobOne = {
  title: '11Software Engineer',
  location: 'Fremont, CA',
  company: 'PDDN',
  url:
    'https://www.linkedin.com/jobs/view/11software-engineer-at-pddn-1928329197',
  ago: '2 months ago',
  applicants: 'Be among the first 25 applicants',
  text: 'Test text',
};

const jobTwo = {
  title: '(1217) ML Engineer - Bots & Spam',
  location: 'San Mateo, CA',
  company: 'Roblox',
  url:
    'https://www.linkedin.com/jobs/view/1217-ml-engineer-bots-spam-at-roblox-1833293731',
  image_url:
    'https://media-exp1.licdn.com/dms/image/C560BAQGF9ES-xE207Q/company-logo_100_100/0?e=1603929600&v=beta&t=2aioea9Yl2wEq7pnMtR3EpyreZWfEjl0BCd8x7VPXN4',
  apply_url:
    'https://www.linkedin.com/jobs/view/externalApply/1833293731?url=https%3A%2F%2Fboards%2Egreenhouse%2Eio%2Froblox%2Fjobs%2F2170236%3Fgh_src%3Dda92d0c91%26s%3DLinkedIn%26source%3DLinkedIn&urlHash=V_aA&trk=public_jobs_apply-link-offsite',
  ago: '7 days ago',
  applicants: 'Over 200 applicants',
  text:
    "**WHY ROBLOX?**\n\nRoblox is ushering in the next generation of entertainment, allowing people to imagine, create, and play together in immersive, user-generated worlds. We're the one and only fastest-growing entertainment platform that lets anyone teach themselves how to code, publish, and monetize any experience imaginable—across any device—reaching millions of players across the globe.\n\nThe impact that you can have at Roblox is powerful. We're looking for someone who's eager to take on a meaningful role in the success of Roblox on a massive scale. Someone who takes play seriously, but also isn't afraid to have some fun either. Someone who's ready to take Roblox—and their career—to the next level.\n\nIn 2018, we were honored to be recognized as a Certified Great Place to Work®. We've fostered a company culture that empowers people to do the most defining work of their career in an environment that's made up of the most passionate, team-oriented, visionary, crazy-smart people you'll ever meet. Join the Roblox team where play rules and the possibilities are endless.\n\nAs an ML Engineer on the Bots & Spam team, you will be helping in improving the Roblox experience by combating bad actors on the platform. We are looking for an experienced ML engineer that can work with Analysts, Product Managers, and Engineers to define unique and innovative solutions to identifying and classifying bots. If you are an engineer who is passionate about solving hard problems and building a highly scalable, high impact platform, the Bots & Spam team might be the place for you.\n\n## You Are\n\nBS, MS or Ph.D. graduate in computer science, engineering, mathematics, machine learning, (computational) physics or statistics.\n3+ years of experience building using algos like SVM, Naive Bayes, Random Forest\nFluent in Python and SQL\nExperience with compiled languages such as golang, Java/Scala or C#\nProductionalized data pipelines/models using tools like Hive, Airflow, Kafka, and Spark\nCollaborative team member, self starter, and adaptable\n\n## You Might Have\n\nStrong mathematical, statistical methods, and analytical skills\nInterest in security and/or bot and spam detection\nExperience with ML libraries/frameworks like TensorFlow, PyTorch, etc\nBuilt large scale ML systems at consumer facing company",
  info:
    '### Seniority level\n\nEntry level\n### Employment type\n\nFull-time\n### Job function\n\nEngineeringInformation Technology\n### Industries\n\nInformation Technology and ServicesComputer SoftwareInternet',
};

const setupDatabase = async () => {
  await Job.deleteMany();
  await new Job(jobOne).save();
};

const teardownDatabase = async () => {
  await mongoose.connection.close();
};

module.exports = {
  jobOne,
  jobTwo,
  setupDatabase,
  teardownDatabase,
};
