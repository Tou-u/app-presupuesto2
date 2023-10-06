ALTER TABLE "expenses" DROP CONSTRAINT "expenses_budget_id_budgets_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "budget_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
