const express = require('express');

const router = new express.Router();
const Job = require('../models/job');
const patterns = require('../db/patterns');

function paginatedResults(model) {
  return async (req, res, next) => {
    const { keywords } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalJobs = keywords
      ? await model
        .countDocuments({
          $or: [
            { title: { $regex: keywords, $options: 'i' } },
            { company: { $regex: keywords, $options: 'i' } },
          ],
        })
        .exec()
      : await Job.estimatedDocumentCount({});
    const results = {
      startIndex,
      endIndex,
      totalJobs,
      keywords,
      limit,
    };

    if (endIndex < totalJobs) {
      results.next = keywords
        ? `/jobs/search?keywords=${keywords}&page=${page + 1}`
        : `/jobs/?page=${page + 1}`;
    }
    if (startIndex > 0) {
      results.previous = keywords
        ? `/jobs/search?keywords=${keywords}&page=${page - 1}`
        : `/jobs/?page=${page - 1}`;
    }

    try {
      results.jobs = keywords
        ? await model
          .find({
            $or: [
              { title: { $regex: keywords, $options: 'i' } },
              { company: { $regex: keywords, $options: 'i' } },
            ],
          })
          .skip(startIndex)
          .limit(limit)
          .exec()
        : await model.find({}).skip(startIndex).limit(limit).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

router.get('/jobs', paginatedResults(Job), async (req, res) => {
  res.render('layout', { content: 'jobs', ...res.paginatedResults });
});

router.post('/jobs', async (req, res) => {
  const job = new Job(req.body);
  try {
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/jobs/search', paginatedResults(Job), async (req, res) => {
  res.render('layout', { content: 'jobs', ...res.paginatedResults });
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send();
    }
    res.render('layout', { content: 'job', job, patterns });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/jobs/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // param { new: true } to return updated job, not original job before update
    // const job = await User.findByIdAndUpdate(
    //     req.params.id, req.body, { new: true, runValidators: true });
    const job = await Job.findOne({ _id: req.params.id, owner: req.user.id });
    if (!job) {
      return res.status(404).send();
    }
    updates.forEach((update) => { job[update] = req.body[update]; });
    res.send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/jobs/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    // const job = await Job.findByIdAndDelete(req.params.id)
    // const job = await Job.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    // if (!job) {
    //     return res.status(401).send()
    // }
    // res.send(job);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
