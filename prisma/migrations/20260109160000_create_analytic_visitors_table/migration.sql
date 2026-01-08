-- CreateTable
CREATE TABLE "analytic_visitors" (
    "id" SERIAL NOT NULL,
    "ip" INET NOT NULL,
    "page_url" TEXT NOT NULL,
    "country" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytic_visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "analytic_visitors_created_at_idx" ON "analytic_visitors"("created_at");
CREATE INDEX "analytic_visitors_ip_idx" ON "analytic_visitors"("ip");
CREATE INDEX "analytic_visitors_country_idx" ON "analytic_visitors"("country");