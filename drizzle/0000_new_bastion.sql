CREATE TABLE `budgets` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` int,
	CONSTRAINT `budgets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` int,
	`category` text,
	`budget_id` int,
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_budget_id_budgets_id_fk` FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON DELETE no action ON UPDATE no action;