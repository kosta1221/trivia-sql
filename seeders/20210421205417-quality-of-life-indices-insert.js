"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"quality_of_life_indices",
			[
				{
					country: "Denmark",
					quality_of_life_index: 192.67,
					pollution_index: 21.33,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Switzerland",
					quality_of_life_index: 192.01,
					pollution_index: 22.39,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Finland",
					quality_of_life_index: 190.22,
					pollution_index: 11.55,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Australia",
					quality_of_life_index: 186.21,
					pollution_index: 23.46,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Netherlands",
					quality_of_life_index: 183.67,
					pollution_index: 27.41,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Austria",
					quality_of_life_index: 182.5,
					pollution_index: 22.19,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Iceland",
					quality_of_life_index: 181.75,
					pollution_index: 16.21,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "New Zealand",
					quality_of_life_index: 181.02,
					pollution_index: 23.4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Germany",
					quality_of_life_index: 179.78,
					pollution_index: 29.03,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Estonia",
					quality_of_life_index: 177.82,
					pollution_index: 19.81,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Sweden",
					quality_of_life_index: 175.95,
					pollution_index: 18.09,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Norway",
					quality_of_life_index: 175.19,
					pollution_index: 20.35,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Slovenia",
					quality_of_life_index: 172.15,
					pollution_index: 24.06,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "United States",
					quality_of_life_index: 172.11,
					pollution_index: 36.88,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Spain",
					quality_of_life_index: 169.82,
					pollution_index: 39.99,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Japan",
					quality_of_life_index: 167.99,
					pollution_index: 39.59,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Oman",
					quality_of_life_index: 167.09,
					pollution_index: 37.74,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Canada",
					quality_of_life_index: 163.47,
					pollution_index: 27.83,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Portugal",
					quality_of_life_index: 162.91,
					pollution_index: 30.89,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "United Kingdom",
					quality_of_life_index: 162.71,
					pollution_index: 40.56,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Qatar",
					quality_of_life_index: 162.29,
					pollution_index: 61.06,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Lithuania",
					quality_of_life_index: 159.42,
					pollution_index: 28.8,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Croatia",
					quality_of_life_index: 159.01,
					pollution_index: 30.46,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "United Arab Emirates",
					quality_of_life_index: 156.67,
					pollution_index: 51.15,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Czech Republic",
					quality_of_life_index: 156.24,
					pollution_index: 40.23,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "France",
					quality_of_life_index: 153.95,
					pollution_index: 43.56,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Ireland",
					quality_of_life_index: 153.53,
					pollution_index: 33.99,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Belgium",
					quality_of_life_index: 153.47,
					pollution_index: 52.94,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Slovakia",
					quality_of_life_index: 152.53,
					pollution_index: 39.66,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Saudi Arabia",
					quality_of_life_index: 150.56,
					pollution_index: 65.09,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Latvia",
					quality_of_life_index: 150,
					pollution_index: 33.73,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Israel",
					quality_of_life_index: 149.94,
					pollution_index: 57.25,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Cyprus",
					quality_of_life_index: 147.93,
					pollution_index: 53.55,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Singapore",
					quality_of_life_index: 144.39,
					pollution_index: 33.48,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Taiwan",
					quality_of_life_index: 143.23,
					pollution_index: 63.35,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Poland",
					quality_of_life_index: 141.83,
					pollution_index: 54.46,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Italy",
					quality_of_life_index: 140.76,
					pollution_index: 55.63,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "South Korea",
					quality_of_life_index: 139.02,
					pollution_index: 62.48,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Belarus",
					quality_of_life_index: 134.83,
					pollution_index: 43.63,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Greece",
					quality_of_life_index: 133.07,
					pollution_index: 52.55,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Romania",
					quality_of_life_index: 132.44,
					pollution_index: 58.42,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "South Africa",
					quality_of_life_index: 131.97,
					pollution_index: 57.3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Bulgaria",
					quality_of_life_index: 129.8,
					pollution_index: 65.33,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Hungary",
					quality_of_life_index: 128.16,
					pollution_index: 48.29,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Turkey",
					quality_of_life_index: 127.1,
					pollution_index: 67.35,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Uruguay",
					quality_of_life_index: 125.98,
					pollution_index: 44.84,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Ecuador",
					quality_of_life_index: 125.14,
					pollution_index: 57,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Bosnia And Herzegovina",
					quality_of_life_index: 121.89,
					pollution_index: 62.33,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Chile",
					quality_of_life_index: 119.76,
					pollution_index: 65.78,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Mexico",
					quality_of_life_index: 118.55,
					pollution_index: 66.1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Malaysia",
					quality_of_life_index: 118.44,
					pollution_index: 63.18,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Serbia",
					quality_of_life_index: 116.3,
					pollution_index: 60.32,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Georgia",
					quality_of_life_index: 115.95,
					pollution_index: 71.09,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Kuwait",
					quality_of_life_index: 115.75,
					pollution_index: 68.69,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Argentina",
					quality_of_life_index: 115.31,
					pollution_index: 50.67,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Jordan",
					quality_of_life_index: 112.4,
					pollution_index: 77.78,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "North Macedonia",
					quality_of_life_index: 110.46,
					pollution_index: 80.23,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "India",
					quality_of_life_index: 108.63,
					pollution_index: 78.87,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Panama",
					quality_of_life_index: 108.36,
					pollution_index: 63.09,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Lebanon",
					quality_of_life_index: 106.56,
					pollution_index: 88.37,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Colombia",
					quality_of_life_index: 105.83,
					pollution_index: 62.83,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Brazil",
					quality_of_life_index: 105.65,
					pollution_index: 54.98,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Morocco",
					quality_of_life_index: 105.46,
					pollution_index: 70.64,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Pakistan",
					quality_of_life_index: 105.44,
					pollution_index: 74.25,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Ukraine",
					quality_of_life_index: 104.77,
					pollution_index: 65.08,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "China",
					quality_of_life_index: 102.81,
					pollution_index: 80.77,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Russia",
					quality_of_life_index: 102.31,
					pollution_index: 62.79,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Thailand",
					quality_of_life_index: 101.88,
					pollution_index: 75.07,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Hong Kong",
					quality_of_life_index: 99.05,
					pollution_index: 67.69,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Indonesia",
					quality_of_life_index: 97.47,
					pollution_index: 66.56,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Kazakhstan",
					quality_of_life_index: 88.31,
					pollution_index: 75.15,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Vietnam",
					quality_of_life_index: 87.48,
					pollution_index: 86.47,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Egypt",
					quality_of_life_index: 86.54,
					pollution_index: 85.65,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Peru",
					quality_of_life_index: 85.46,
					pollution_index: 84.13,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Philippines",
					quality_of_life_index: 85.37,
					pollution_index: 74.28,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Sri Lanka",
					quality_of_life_index: 85.16,
					pollution_index: 59.14,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Iran",
					quality_of_life_index: 74.14,
					pollution_index: 77.45,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Kenya",
					quality_of_life_index: 70.56,
					pollution_index: 76.6,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Bangladesh",
					quality_of_life_index: 70.03,
					pollution_index: 86.21,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					country: "Nigeria",
					quality_of_life_index: 55.65,
					pollution_index: 87.63,
					created_at: new Date(),
					updated_at: new Date(),
				},
			].map((data, i) => ({ id: i + 1, ...data })),
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("quality_of_life_indices", null, {});
	},
};
