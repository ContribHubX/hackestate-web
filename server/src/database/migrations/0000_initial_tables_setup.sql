CREATE TABLE "user" (
	"pid" varchar PRIMARY KEY NOT NULL,
	"password" varchar,
	"dob" date,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "test_results" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_pid" varchar NOT NULL,
	"test_name" varchar NOT NULL,
	"binary_pdf" "bytea" NOT NULL,
	"test_date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_user_pid_user_pid_fk" FOREIGN KEY ("user_pid") REFERENCES "public"."user"("pid") ON DELETE cascade ON UPDATE no action;