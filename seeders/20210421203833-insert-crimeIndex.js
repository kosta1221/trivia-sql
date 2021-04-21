"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "crime_indices",
      [
        {
          Country: "Venezuela",
          crime_index: 84.49,
        },
        {
          Country: "Papua New Guinea",
          crime_index: 81.93,
        },
        {
          Country: "South Africa",
          crime_index: 77.49,
        },
        {
          Country: "Afghanistan",
          crime_index: 76.23,
        },
        {
          Country: "Honduras",
          crime_index: 76.11,
        },
        {
          Country: "Trinidad And Tobago",
          crime_index: 73.19,
        },
        {
          Country: "Brazil",
          crime_index: 68.88,
        },
        {
          Country: "Peru",
          crime_index: 68.15,
        },
        {
          Country: "El Salvador",
          crime_index: 67.96,
        },
        {
          Country: "Guyana",
          crime_index: 67.66,
        },
        {
          Country: "Namibia",
          crime_index: 67.21,
        },
        {
          Country: "Syria",
          crime_index: 66.46,
        },
        {
          Country: "Jamaica",
          crime_index: 66.04,
        },
        {
          Country: "Puerto Rico",
          crime_index: 65.63,
        },
        {
          Country: "Angola",
          crime_index: 64.97,
        },
        {
          Country: "Bangladesh",
          crime_index: 63.94,
        },
        {
          Country: "Nigeria",
          crime_index: 63.77,
        },
        {
          Country: "Bahamas",
          crime_index: 62.86,
        },
        {
          Country: "Libya",
          crime_index: 62.19,
        },
        {
          Country: "Kazakhstan",
          crime_index: 62.02,
        },
        {
          Country: "Argentina",
          crime_index: 61.77,
        },
        {
          Country: "Kenya",
          crime_index: 61.66,
        },
        {
          Country: "Dominican Republic",
          crime_index: 61.16,
        },
        {
          Country: "Uganda",
          crime_index: 59,
        },
        {
          Country: "Tanzania",
          crime_index: 58.95,
        },
        {
          Country: "Fiji",
          crime_index: 58.92,
        },
        {
          Country: "Malaysia",
          crime_index: 58.84,
        },
        {
          Country: "Somalia",
          crime_index: 58.5,
        },
        {
          Country: "Mongolia",
          crime_index: 57.97,
        },
        {
          Country: "Guatemala",
          crime_index: 57.83,
        },
        {
          Country: "Zimbabwe",
          crime_index: 57.47,
        },
        {
          Country: "Costa Rica",
          crime_index: 56.33,
        },
        {
          Country: "Colombia",
          crime_index: 54.79,
        },
        {
          Country: "Mexico",
          crime_index: 53.97,
        },
        {
          Country: "Uruguay",
          crime_index: 53.81,
        },
        {
          Country: "Botswana",
          crime_index: 53.49,
        },
        {
          Country: "Maldives",
          crime_index: 53.21,
        },
        {
          Country: "Bolivia",
          crime_index: 52.93,
        },
        {
          Country: "Ecuador",
          crime_index: 50.9,
        },
        {
          Country: "Cambodia",
          crime_index: 50.66,
        },
        {
          Country: "Algeria",
          crime_index: 49.81,
        },
        {
          Country: "Paraguay",
          crime_index: 49.6,
        },
        {
          Country: "Iran",
          crime_index: 49.25,
        },
        {
          Country: "Ethiopia",
          crime_index: 49.21,
        },
        {
          Country: "Ghana",
          crime_index: 48.97,
        },
        {
          Country: "Ukraine",
          crime_index: 48.85,
        },
        {
          Country: "Morocco",
          crime_index: 48.69,
        },
        {
          Country: "Iraq",
          crime_index: 47.78,
        },
        {
          Country: "Mauritius",
          crime_index: 47.33,
        },
        {
          Country: "United States",
          crime_index: 47.2,
        },
        {
          Country: "Panama",
          crime_index: 47.19,
        },
        {
          Country: "Sweden",
          crime_index: 47.07,
        },
        {
          Country: "Egypt",
          crime_index: 46.92,
        },
        {
          Country: "France",
          crime_index: 46.79,
        },
        {
          Country: "Myanmar",
          crime_index: 45.86,
        },
        {
          Country: "Indonesia",
          crime_index: 45.84,
        },
        {
          Country: "Ireland",
          crime_index: 45.43,
        },
        {
          Country: "Vietnam",
          crime_index: 45.35,
        },
        {
          Country: "Chile",
          crime_index: 45.23,
        },
        {
          Country: "Moldova",
          crime_index: 44.98,
        },
        {
          Country: "Nicaragua",
          crime_index: 44.44,
        },
        {
          Country: "Italy",
          crime_index: 44.26,
        },
        {
          Country: "Pakistan",
          crime_index: 44.08,
        },
        {
          Country: "Belgium",
          crime_index: 43.98,
        },
        {
          Country: "United Kingdom",
          crime_index: 43.71,
        },
        {
          Country: "Palestine",
          crime_index: 43.59,
        },
        {
          Country: "Lebanon",
          crime_index: 43.36,
        },
        {
          Country: "India",
          crime_index: 43.32,
        },
        {
          Country: "Bosnia And Herzegovina",
          crime_index: 43.03,
        },
        {
          Country: "Philippines",
          crime_index: 42.16,
        },
        {
          Country: "Tunisia",
          crime_index: 41.88,
        },
        {
          Country: "Australia",
          crime_index: 41.36,
        },
        {
          Country: "Montenegro",
          crime_index: 41.18,
        },
        {
          Country: "Russia",
          crime_index: 41.12,
        },
        {
          Country: "New Zealand",
          crime_index: 40.93,
        },
        {
          Country: "Jordan",
          crime_index: 40.83,
        },
        {
          Country: "Thailand",
          crime_index: 40.48,
        },
        {
          Country: "Greece",
          crime_index: 40.32,
        },
        {
          Country: "Sri Lanka",
          crime_index: 40.22,
        },
        {
          Country: "Canada",
          crime_index: 39.67,
        },
        {
          Country: "Albania",
          crime_index: 39.52,
        },
        {
          Country: "Turkey",
          crime_index: 39.49,
        },
        {
          Country: "Malta",
          crime_index: 39.04,
        },
        {
          Country: "North Macedonia",
          crime_index: 38.67,
        },
        {
          Country: "Bulgaria",
          crime_index: 38.5,
        },
        {
          Country: "Serbia",
          crime_index: 37.41,
        },
        {
          Country: "Latvia",
          crime_index: 36.95,
        },
        {
          Country: "Norway",
          crime_index: 35.43,
        },
        {
          Country: "Hungary",
          crime_index: 35.08,
        },
        {
          Country: "Germany",
          crime_index: 34.81,
        },
        {
          Country: "Kuwait",
          crime_index: 34.75,
        },
        {
          Country: "Nepal",
          crime_index: 34.56,
        },
        {
          Country: "Luxembourg",
          crime_index: 33.39,
        },
        {
          Country: "Lithuania",
          crime_index: 33.06,
        },
        {
          Country: "Kosovo (Disputed Territory)",
          crime_index: 32.91,
        },
        {
          Country: "Spain",
          crime_index: 31.96,
        },
        {
          Country: "China",
          crime_index: 31.83,
        },
        {
          Country: "Azerbaijan",
          crime_index: 31.61,
        },
        {
          Country: "Singapore",
          crime_index: 30.57,
        },
        {
          Country: "Cyprus",
          crime_index: 30.01,
        },
        {
          Country: "Portugal",
          crime_index: 29.63,
        },
        {
          Country: "Israel",
          crime_index: 29.6,
        },
        {
          Country: "Bahrain",
          crime_index: 29.29,
        },
        {
          Country: "Slovakia",
          crime_index: 29.22,
        },
        {
          Country: "Poland",
          crime_index: 28.5,
        },
        {
          Country: "South Korea",
          crime_index: 28.02,
        },
        {
          Country: "Brunei",
          crime_index: 27.68,
        },
        {
          Country: "Romania",
          crime_index: 27.64,
        },
        {
          Country: "Netherlands",
          crime_index: 27.62,
        },
        {
          Country: "Cuba",
          crime_index: 27.45,
        },
        {
          Country: "Saudi Arabia",
          crime_index: 26.18,
        },
        {
          Country: "Czech Republic",
          crime_index: 25.52,
        },
        {
          Country: "Denmark",
          crime_index: 25.1,
        },
        {
          Country: "Belarus",
          crime_index: 24.99,
        },
        {
          Country: "Croatia",
          crime_index: 24.71,
        },
        {
          Country: "Austria",
          crime_index: 23.73,
        },
        {
          Country: "Iceland",
          crime_index: 23.36,
        },
        {
          Country: "Finland",
          crime_index: 23.32,
        },
        {
          Country: "Estonia",
          crime_index: 23.14,
        },
        {
          Country: "Armenia",
          crime_index: 21.6,
        },
        {
          Country: "Switzerland",
          crime_index: 21.6,
        },
        {
          Country: "Slovenia",
          crime_index: 21.07,
        },
        {
          Country: "Oman",
          crime_index: 20.79,
        },
        {
          Country: "Hong Kong",
          crime_index: 20.7,
        },
        {
          Country: "Japan",
          crime_index: 20.66,
        },
        {
          Country: "Georgia",
          crime_index: 20.21,
        },
        {
          Country: "United Arab Emirates",
          crime_index: 15.7,
        },
        {
          Country: "Taiwan",
          crime_index: 15.65,
        },
        {
          Country: "Qatar",
          crime_index: 11.86,
        },
      ].map((country, i) => ({ id: i + 1, ...country })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("crime_indices", null, {});
  },
};
