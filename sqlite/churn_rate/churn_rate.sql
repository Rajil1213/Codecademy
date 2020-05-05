WITH months AS (
  SELECT
  '2017-01-01' AS first_day,
  '2017-01-31' AS last_day
  UNION
  SELECT
  '2017-02-01' AS first_day,
  '2017-02-28' AS last_day
  UNION
  SELECT
  '2017-03-01' AS first_day,
  '2017-03-31' AS last_day
),

segments AS (
  SELECT
  87 AS category
  UNION
  SELECT
  30 AS category
),

cross_join AS (
  SELECT *
  FROM subscriptions CROSS JOIN
  (months
  CROSS JOIN segments)
),

status AS (
  SELECT id,
    first_day AS month,
    CASE
      WHEN segment = category
      THEN category
    END AS category,
    CASE
      WHEN segment = category AND (
        subscription_start < first_day
      ) THEN 1
      ELSE 0
    END AS is_active,

    CASE
      WHEN segment = category AND (
        subscription_end BETWEEN first_day AND last_day
      ) THEN 1
      ELSE 0
    END AS is_canceled
    FROM cross_join
),

status_category AS (
  SELECT *
  FROM status
  WHERE category IS NOT NULL
),

status_aggregate AS (
  SELECT month, category,
    SUM(is_active) AS 'sum_active',
    SUM(is_canceled) AS 'sum_canceled'
  FROM status_category
  GROUP BY month, category
)

SELECT month, category,
  1.0 * sum_canceled / sum_active AS 'churn_rate'
FROM status_aggregate
GROUP BY month, category
ORDER BY churn_rate ASC, month ASC;
