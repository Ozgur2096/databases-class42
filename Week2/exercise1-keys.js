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

db.query('DROP TABLE IF EXISTS authors');

db.query(
  'CREATE TABLE IF NOT EXISTS authors (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(255), university VARCHAR(200), date_of_birth DATE, h_index INT, gender VARCHAR(20))',
  err => {
    if (err) {
      throw err;
    }
    console.log('Table Authors Created');
  }
);

db.query('ALTER TABLE authors ADD mentor INT', err => {
  if (err) {
    throw err;
  }
  console.log('Mentor column added');
});

db.query(
  'ALTER TABLE authors ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)',
  err => {
    if (err) {
      throw err;
    }
    console.log('Foreign key added to mentor');
  }
);

db.query(
  "INSERT INTO authors (author_name, university, date_of_birth, h_index, gender,mentor) VALUES ('John Smith', 'Massachusetts Institute of Technology', '1985-05-15', 10, 'Male', null),('Jane Doe', 'Harvard University', '1978-10-23', 15, 'Female', 1), ('David Lee', 'Stanford University', '1990-02-01', 8, 'Male', 2), ('Maria Perez', 'Massachusetts Institute of Technology', '1987-12-07', 12, 'Female', 1), ('Andrew Kim', 'Stanford University', '1982-06-12', 9, 'Male', 4), ('Emily Wong', 'Columbia University', '1984-08-18', 14, 'Female', 5), ('Chris Lee', 'University of Cambridge', '1975-03-25', 11, 'Male', 3), ('Karen Davis', 'Yale University', '1993-01-09', 7, 'Female', 7), ('Michael Chen', 'University of Oxford', '1989-11-02', 10, 'Male', 3), ('Rachel Kim', 'University of Oxford', '1981-09-29', 16, 'Female', 2), ('Kevin Johnson', 'Princeton University', '1983-07-14', 12, 'Male', 6), ('Amy Lee', 'Harvard University', '1992-04-05', 6, 'Female', 2), ('Daniel Kim', 'ETH Zurich', '1986-12-01', 13, 'Male', 5), ('Grace Chen', 'Harvard University', '1979-02-17', 9, 'Female', 6), ('Thomas Brown', 'University of Oxford', '1980-06-21', 11, 'Male', 3)",
  err => {
    if (err) {
      throw err;
    }
    console.log('Author data inserted');
  }
);

db.query('UPDATE authors SET mentor = 4 WHERE author_id = 1', err => {
  if (err) {
    throw err;
  }
  console.log('Author data updated');
});
