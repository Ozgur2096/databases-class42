const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySql connected...');
});

connection.query('CREATE DATABASE IF NOT EXISTS meetup', (err, result) => {
  if (err) throw err;
  console.log(result);
});

connection.query('USE meetup', err => {
  if (err) throw err;
});

connection.query('DROP TABLE invitee');
connection.query('DROP TABLE meeting');
connection.query('DROP TABLE room');

// Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by).
connection.query(
  'CREATE TABLE invitee (invitee_no INT NOT NULL AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY(invitee_no))',
  err => {
    if (err) throw err;
    console.log('Database Invitee created');
  }
);

// Create a table called Room with the following fields (room_no, room_name and floor_number)
connection.query(
  'CREATE TABLE room (room_no INT NOT NULL, room_name VARCHAR(255), floor_number INT, PRIMARY KEY(room_no))',
  err => {
    if (err) throw err;
    console.log('Database Room created');
  }
);

// Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
connection.query(
  'CREATE TABLE meeting (meeting_no INT NOT NULL AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, PRIMARY KEY(meeting_no), FOREIGN KEY(room_no) REFERENCES room(room_no))',
  err => {
    if (err) throw err;
    console.log('Database meeting created');
  }
);

// Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
const invitees = [
  { invitee_name: 'John Doe', invited_by: 'Bob Doe' },
  { invitee_name: 'Jane Doe', invited_by: 'Bob Doe' },
  { invitee_name: 'Ursula Le Guin', invited_by: 'Kate Brown' },
  { invitee_name: 'Gabriel Garcia Marquez', invited_by: 'Kate Brown' },
  { invitee_name: 'Edgar Allan Poe', invited_by: 'Emily Dickinson' },
];
invitees.forEach(invitee => {
  connection.query('INSERT INTO invitee SET ?', invitee, err => {
    if (err) throw err;
    console.log('Invitee data inserted');
  });
});

const rooms = [
  { room_no: 512, room_name: 'Conference Room 2', floor_number: 5 },
  { room_no: 202, room_name: 'Conference Room 1', floor_number: 2 },
  { room_no: 109, room_name: 'Conference Room 3', floor_number: 1 },
  { room_no: 216, room_name: 'Meeting Room 1', floor_number: 2 },
  { room_no: 403, room_name: 'Meeting Room 2', floor_number: 4 },
];
rooms.forEach(room => {
  connection.query('INSERT INTO room SET ?', room, err => {
    if (err) throw err;
    console.log('Room data inserted');
  });
});

const meetings = [
  {
    meeting_title: 'The Word for World is Forest',
    starting_time: '2023-05-07 12:00',
    ending_time: '2023-05-07 15:00',
    room_no: '512',
  },
  {
    meeting_title: 'Quoth the Raven Nevermore',
    starting_time: '2023-05-09 12:00',
    ending_time: '2023-05-09 15:00',
    room_no: '202',
  },
  {
    meeting_title: 'Important Meeting',
    starting_time: '2023-05-11 12:00',
    ending_time: '2023-05-11 15:00',
    room_no: '109',
  },
  {
    meeting_title: 'Who is John Doe?',
    starting_time: '2023-05-13 12:00',
    ending_time: '2023-05-13 15:00',
    room_no: '216',
  },
  {
    meeting_title: 'One Hundred Years of Solitude',
    starting_time: '2023-05-15 12:00',
    ending_time: '2023-05-15 15:00',
    room_no: '403',
  },
];
meetings.forEach(meeting => {
  connection.query('INSERT INTO meeting SET ?', meeting, err => {
    if (err) throw err;
    console.log('Meeting data inserted');
  });
});
