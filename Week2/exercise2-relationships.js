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

db.query('CREATE DATABASE IF NOT EXISTS homeworkWeek2db');

db.query('USE homeworkWeek2db', err => {
  if (err) {
    throw err;
  }
});

db.query('DROP TABLE IF EXISTS research_Papers');

db.query(
  'CREATE TABLE IF NOT EXISTS research_Papers (paper_id INT AUTO_INCREMENT PRIMARY KEY, paper_title VARCHAR(255), conference VARCHAR(200), publish_date DATE)',
  err => {
    if (err) {
      throw err;
    }
    console.log('Table research_Papers Created');
  }
);

db.query('DROP TABLE IF EXISTS author_research_Paper');

db.query(
  'CREATE TABLE IF NOT EXISTS author_research_Paper (id INT AUTO_INCREMENT PRIMARY KEY, author_id INT, research_Paper_id INT, FOREIGN KEY (author_id) REFERENCES authors (author_id), FOREIGN KEY (research_Paper_id) REFERENCES research_Papers (paper_id))',
  err => {
    if (err) {
      throw err;
    }
    console.log('Table author_research_Paper Created');
  }
);

db.query(
  'INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ("The Importance of Time Management", "International Conference on Time Management", "2022-06-15"), ("The Impact of Social Media on Mental Health", "World Mental Health Symposium", "2023-01-10"),("Quantum Computing and Its Applications", "IEEE International Conference on Quantum Computing", "2022-11-28"), ("The Future of Robotics and Automation", "ACM/IEEE International Conference on Robotics and Automation", "2023-05-02"), ("Advances in Artificial Intelligence", "AAAI Conference on Artificial Intelligence", "2022-07-12"), ("Big Data Analytics for Improved Healthcare", "International Conference on Big Data Analytics in Healthcare", "2023-03-19"), ("The Impact of Climate Change on Agriculture", "International Conference on Climate Change and Agriculture", "2022-09-05"), ("Blockchain and Its Applications in Finance", "International Conference on Blockchain and Finance", "2023-04-23"), ("Machine Learning Techniques for Predictive Maintenance", "International Conference on Predictive Maintenance and Reliability", "2022-12-06"), ("Cybersecurity Threats and Countermeasures", "International Conference on Cybersecurity", "2023-07-25"),("Advances in Biotechnology for Sustainable Development", "International Conference on Biotechnology and Sustainable Development", "2022-08-16"), ("The Future of Autonomous Vehicles", "IEEE Conference on Intelligent Transportation Systems", "2023-06-07"), ("Green Energy Technologies for Renewable Energy", "International Conference on Green Energy Technologies", "2022-10-09"), ("Recent Advances in Natural Language Processing", "Annual Meeting of the Association for Computational Linguistics", "2023-08-01"), ("The Impact of Artificial Intelligence on Education", "International Conference on Artificial Intelligence in Education", "2022-05-11"), ("The Role of Data Science in Marketing Analytics", "International Conference on Marketing Analytics and Data Science", "2023-02-27"), ("The Future of Human-Computer Interaction", "ACM SIGCHI Conference on Human Factors in Computing Systems", "2023-04-30"), ("Smart Cities: Challenges and Opportunities", "International Conference on Smart Cities", "2022-11-14"), ("Advances in Computer Vision and Image Processing", "International Conference on Computer Vision and Image Processing", "2023-06-19"), ("The Role of Digital Transformation in Business Strategy", "International Conference on Digital Transformation", "2022-09-12"), ("The Impact of Artificial Intelligence on Healthcare", "International Conference on Artificial Intelligence in Healthcare", "2023-03-06"), ("The Future of Work: Challenges and Opportunities", "International Conference on Future of Work", "2022-07-18"), ("Advances in Nanotechnology and Materials Science", "International Conference on Nanotechnology and Materials Science", "2023-05-08"), ("The Role of Social Networks in Marketing", "International Conference on Social Networks and Marketing", "2022-12-19"), ("The Future of Renewable Energy", "International Conference on Renewable", "2022-07-18"), ("The Future of Robotics: Challenges and Opportunities", "International Conference on Robotics and Automation", "2021-06-30"), ("Bioinformatics: Trends and Challenges", "International Conference on Bioinformatics and Computational Biology", "2020-04-02"), ("Cloud Computing: Trends and Applications", "International Conference on Cloud Computing", "2021-05-09"), ("Smart Cities: Technologies and Applications", "International Conference on Smart Cities", "2022-11-14"), ("Federated Learning: Techniques and Applications", "International Conference on Federated Learning", "2021-10-22")'
);

db.query(
  'INSERT INTO author_research_Paper (author_id, research_Paper_id) VALUES (1,4),(1,9),(1,12),(2,1),(2,5),(2,15),(3,2),(3,19),(3,29),(4,8),(4,18),(4,16),(5,26),(5,28),(5,21),(6,7),(6,13),(6,23),(7,3),(7,10),(7,11),(8,17),(8,22),(8,24),(9,9),(9,6),(9,14),(10,15),(10,20),(10,21),(11,23),(11,25),(11,27),(12,30),(12,1),(12,2),(13,6),(13,8),(13,13),(13,30),(14,10),(14,5),(14,19),(14,22),(15,6),(15,24),(15,26),(15,17)'
);
