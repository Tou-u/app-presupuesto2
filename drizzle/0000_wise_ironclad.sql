CREATE TABLE `budget` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` int,
	CONSTRAINT `budget_id` PRIMARY KEY(`id`)
);
