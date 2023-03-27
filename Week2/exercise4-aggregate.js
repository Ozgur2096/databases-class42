const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySql connected...');
});

db.query('USE homeworkWeek2db', err => {
  if (err) {
    throw err;
  }
});

db.query(
  'SELECT research_papers.paper_id, research_papers.paper_title, COUNT(authors.author_id) AS number_of_authors FROM research_papers JOIN author_research_paper ON author_research_paper.research_Paper_id = research_papers.paper_id JOIN authors ON author_research_paper.author_id = authors.author_id GROUP BY research_papers.paper_id ORDER BY research_papers.paper_id',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  }
);

db.query(
  'WITH new_table AS (SELECT authors.author_name, authors.gender, research_papers.paper_id, research_papers.paper_title FROM authors JOIN author_research_paper ON author_research_paper.research_Paper_id = authors.author_id JOIN research_papers ON author_research_paper.author_id = research_papers.paper_id WHERE authors.gender = "Female") SELECT COUNT(gender) AS Sum_of_the_research_papers_published_by_all_female_authors FROM new_table',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  }
);

db.query(
  'SELECT university, AVG(h_index) AS average_h_index FROM authors GROUP BY university',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  }
);

db.query(
  'SELECT authors.university, COUNT(author_research_paper.research_Paper_id) AS num_papers FROM authors JOIN author_research_paper ON authors.author_id = author_research_paper.author_id GROUP BY authors.university',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  }
);

db.query(
  'SELECT university, MAX(h_index) AS max_h_index, MIN(h_index) AS min_h_index FROM authors GROUP BY university',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  }
);
