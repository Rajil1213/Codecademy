# Description from Codecademy Churn Rates Project

## Calculating Churn Rates

Four months into launching Codeflix, management asks you to look into subscription churn rates. It’s early on in the business and people are excited to know how the company is doing.

The marketing department is particularly interested in how the churn compares between two segments of users. They provide you with a dataset containing subscription data for users who were acquired through two distinct channels.

The dataset provided to you contains one SQL table, subscriptions. Within the table, there are 4 columns:

id - the subscription id
subscription_start - the start date of the subscription
subscription_end - the end date of the subscription
segment - this identifies which segment the subscription owner belongs to

Codeflix requires a minimum subscription length of 31 days, so a user can never start and end their subscription in the same month.

## About this repo:
Contains my solution to the project. The sqlite query in churn_rate.sql calculates the *churn_rate* for the database described above, for each month, for each segment. The segments are "not" hardcoded and so, the query can be scaled for any number of user segments.
