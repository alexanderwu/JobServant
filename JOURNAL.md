# Job Servant

Alexander Wu | 07/22/20 | Draft

**Objective**: Organize your job search. Job Servant serves your job search needs

Goals:

* Save job postings offline
  * to a database via a local web app
* Dashboard analytics
  * Recently applied
  * Heatmap of companies
  * Keywords horizontal bar graph. w/ drilldown
  * Recommended jobs

Nice-to-haves features

* Loads fast. Nobody wants slow.
* search bar
* recommend similar jobs based on keywords and job description
* tailor resume based on job description
* easily import job posting
  * via web scraping, copy-paste outer HTML, or python script
* resume.json editor
* Interview Preparation Grid
  * Challenges, Mistakes/Failures, Enjoyed, Leadership, Conflicts, What You'd Do Differently
  * Nugget, Situation, Action, Result, What it says (Initiative/Leadership, Empathy, Compassion, Humility, Teamwork/Helpfulness)

__Design Decisions__

* Node.js express for back-end
  * Only need one language, JavaScript, for front-end and back-end
* Mongoose
  * most popular MongoDB database. NoSQL is more flexible, we don't need to scale, so it's fine if we don't use SQL
* Front-end: EJS for templating
* ~~handlebars for templating~~
  * seems to be most popular JS template engine: https://npmcompare.com/compare/ejs,handlebars,nunjucks,pug
  * React adds overhead. Not enough interactivity to justify. React has a learning curve.
  * I don't know Angular or Vue
* Layout: ~~CSS grid~~ flexbox
  * https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
* I don't want overhead of Bootstrap
* Floats are a thing of the past
  * https://zellwk.com/blog/9-important-css-properties-you-must-know/

Fun stuff: http://todomvc.com/

## Machine Learning Abtract Words

Thought: How do children learn the meaning of abstract words? Can we teach a machine these words similarly?

I research on Google to find out.

---

"Some explanations of abstract word learning suggest that these words are learnt primarily from the linguistic input, using statistical co-occurrences of words in language, whereas concrete words can also rely on non-linguistic, experiential information"

* https://www.reddit.com/r/linguistics/comments/5xp8t4/how_do_children_learn_abstract_words/dek51ve/
* Research shows that DLD or ASD don't have more difficulty learning abstract words over concrete words
* Children learn vast majority of words/concepts between six and ten. Abstract words with emotional content is learned earlier

---

Thoughts: all models are wrong, but some are useful

language is dynamic, the meaning of words change over time. So what does it mean to teach a computer English? Just like there are different dialects, who is to say which is more correct?

## Puppeteer learning

* I'm thinking of learning puppeteer to scrape jobs

Source: https://developers.google.com/web/tools/puppeteer/get-started

* initial page size to 800×600px
  * customize with `Page.setViewport()`
* GitHub examples
  * https://github.com/jvandenaardweg/linkedin-profile-scraper
  * https://github.com/spinlud/linkedin-jobs-scraper
  * https://github.com/AdhityaRamadhanus/inkscraper
  * https://github.com/linkedtales/scrapedin
    * for profiles

## Journal

* __7/21/20: Initialize project__
* Should I run `npm i lodash`? nah
* __07/22/20: datbase schema__
* ref and virtual ref. job postings should store companies
* inspired by https://www.industrialempathy.com/posts/design-doc-a-design-doc/
* __07/24/20:__
* youc cannot set the width and height of inline elements
* __07/24/20:__
* html2markdown
  * https://stonehank.github.io/html-to-md/
  * http://domchristie.github.io/turndown/
* NodeJS notebook
  * https://github.com/pixiedust/pixiedust
  * https://github.com/n-riesco/ijavascript
* __07/25/20:__
* Ctrl + Shift + A: Select between HTML tags
* __07/26/20: Import jobs.csv__

Created `jobs.csv` via Jupyter Notebook. Input: `LinkedIn.csv`

```sh
mongoimport --type csv -d jobservantDB -c jobs --headerline jobs.csv
mongoexport --collection=jobs --db=jobservantDB --out=jobs.json
mongoexport -c jobs -d jobservantDB --out=jobs.json
```

* https://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application
* I encounter issue with handlebars. so i decide to roll with EJS
  * https://github.com/handlebars-lang/handlebars.js/issues/1642
  * https://github.com/handlebars-lang/handlebars.js/pull/1633
* __07/27/20:__
* CRUD app: https://medium.com/@olinations/build-a-crud-template-using-react-bootstrap-express-postgres-9f84cc444438
* Jupyter Notebook experience for JavaScript
* https://observablehq.com/@observablehq/observable-for-jupyter-users
  * https://eloquentjavascript.net/
  * https://observablehq.com/@ballingt/javascript-for-python-programmers
* https://stackoverflow.com/questions/30610675/python-pandas-equivalent-in-javascript
  * https://arrow.apache.org/docs/js/

```html
  <!-- <% jobs.forEach(function(job){ %>
    <div class="job">
      <p><%= job.title %></p>
    </div>
  <% }) %> -->
```

```sh
db.getCollection('jobs').find({ 'createdAt': { $exists: true } })
```

* Idea: Resume components and instances (similar to figma)
* Idea: Main landing page has a 3 card view
  * jobs, resumes, companies

* __7/30/20: Pagination__
* (Source: https://nordicapis.com/everything-you-need-to-know-about-api-pagination/)
  * Offset pagination, keyset pagination, seek pagination
  * https://nordicapis.com/everything-you-need-to-know-about-api-pagination/
  * https://stackoverflow.com/questions/5020704/how-to-design-restful-search-filtering
  * https://www.c-sharpcorner.com/blogs/adding-search-functionality-in-node-application

How to paginate with total count???

* https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
* https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0

* https://www.youtube.com/watch?v=ZX3qt0UWifc
  * Super helpful. This is what I ended up using.

```
  <% if (startIndex <= endIndex) { %>
    <p>
      <%= startIndex + 1 %>-<%= endIndex %> of <%= totalJobs %>
    </p>
  <% } %>
```

* __07/31/20:__
* Reading about middleware
  * https://expressjs.com/en/guide/using-middleware.html

```js
async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 25;
        const totalJobs = await Job.estimatedDocumentCount({});
        const startIndex = (page-1)*perPage;
        const endIndex = Math.min(page * perPage, totalJobs);
        // const jobs = await Job.find({ 'createdAt': { $exists: true } }).skip(0).limit(50)
        const jobs = await Job.find({})
          .sort({ _id: -1 })
          .skip(startIndex)
          .limit(perPage);
        res.render("layout", {
          content: "jobs",
          startIndex,
          endIndex,
          totalJobs,
          jobs,
        });
    } catch (error) {
        res.status(500).send(error)
    }
  }
```

```html
<a href="<%= next || ''%>" class="btn <%= next ? '' : 'disabled' %>">Next</a>
```

* __07/31/20: mongoimport jobs.csv:__
* 1841 document(s) imported successfully. 338 document(s) failed to import

* __08/06/20:__
* NER heuristic

Suggested tokens:

* frequent words which are not in a dictionary
* words which are captilized out of place

regex replacement pipeline. spacy matcher.

* __08/07/20:__

* I read about tokenization: https://huggingface.co/transformers/tokenizer_summary.html
  * https://arxiv.org/pdf/1808.06226.pdf

HTML ⟶ Markdown

```py
import html2text
import html2markdown
from markdownify import markdownify as md
import pypandoc

md('<b>Yay</b> <a href="http://github.com">GitHub</a>')  # > '**Yay** [GitHub](http://github.com)'

html2text.html2text(html)
html2markdown.convert(html)
md(html)
pypandoc.convert_text(html, 'md', format='html', extra_args=['--atx-headers'])
```

* __08/10/20: Parsing HTML to markdown__
* The problem: `<strong>.+<br><br>.+</strong>`
* remark Markdown processor: https://github.com/remarkjs/remark
* MDX for JSX in markdown
* __08/19/20: Running python code in back-end__
* FastAPI
  * https://fastapi.tiangolo.com/advanced/nosql-databases/
* https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
* Spacy with Node.js
  * https://towardsdatascience.com/natural-language-processing-with-spacy-in-node-js-87214d5547
* __08/20/20:__
* Displacy with Flask
  * https://github.com/Jcharis/Machine-Learning-Web-Apps/tree/master/DisplaCify_App-Using-Displacy-in-Flask
* FastAPI
  * https://towardsdatascience.com/why-we-switched-from-flask-to-fastapi-for-production-machine-learning-765aab9b3679
* OAS = OpenAPI Specification
  * used for swagger
* pydantic does data validation
* `Optional[str]` will let your editor help you finding errors in your code
  * `from typing import Optional`
* pydantic model is interpreted as request body
* Alembic is a lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python
* __08/21/20: How to integrate NLP with Node.js__
* spacy-nlp or spacy-js. code is not maintained
* call python code with child_process
* interact with server with flask or fastapi server and websocket
* npm package to do similar thing: https://www.npmjs.com/package/natural
* Webscraping
  * pupeteer. headless chromium
    * playwright. designed tto be cross-browser
  * cheerio. like jquery
* __08/26/20:__
* Tangent
  * https://github.com/jonschlinkert
* __9/03/20: Add job description keyword highlighting and demo project with gif__
* demo gif with ScreenToGif
