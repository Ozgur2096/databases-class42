require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

async function getTotalPopulationForGivenCountryPerYear(client, country) {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: '$Year',
        countPopulation: {
          $sum: {
            $add: ['$M', '$F'],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = await client
    .db('databaseWeek4')
    .collection('population_pyramid')
    .aggregate(pipeline);

  await aggCursor.forEach(console.log);
}

getTotalPopulationForGivenCountryPerYear(client, 'Netherlands');

async function getContinentInformation(client, year, age) {
  const pipeline = [
    {
      $match: {
        $or: [
          { Country: { $regex: '^[A-Z]+$' } }, // Matches all-capital letters but if there is a space, it will be a problem.
          {
            Country: {
              $in: ['LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA'],
            },
          },
        ],
        Year: year,
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $add: ['$M', '$F'],
        },
      },
    },
  ];

  const aggCursor = await client
    .db('databaseWeek4')
    .collection('population_pyramid')
    .aggregate(pipeline);

  await aggCursor.forEach(console.log);
}

getContinentInformation(client, 2020, '100+');
