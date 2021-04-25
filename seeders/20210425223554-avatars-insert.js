"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"avatars",
			[
				{
					img_src: "/avatars/Avatar1.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar2.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar3.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar4.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar5.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar6.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar7.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar8.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar9.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar10.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar11.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar12.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar13.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar14.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar15.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar16.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar17.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar18.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar19.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					img_src: "/avatars/Avatar20.png",
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("avatars", null, {});
	},
};
