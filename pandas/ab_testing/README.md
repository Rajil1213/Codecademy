# Using Pandas to Analyze A/B Testing Data

## Description from Codecademy
Our favorite online shoe store, ShoeFly.com is performing an A/B Test. They have two different versions of an ad, which they have placed in emails, as well as in banner ads on Facebook, Twitter, and Google. They want to know how the two ads are performing on each of the different platforms on each day of the week. Help them analyze the data using aggregate measures.

## About this repo
This repo contains two files:
- ad_clicks.csv : a `csv` file with columns:
  - `user_id` : an id unique to each user
  - `utm_source` : the source that directed user to our website
  - `day` : day of the week from 2-Monday through 1-Sunday 
  - `ad_click_timestamp` : the time stamp pertaining to clicking of the add; stores NaN if user didn't click
  - `experimental_group` : indicates whether the user is in group A or B
- script.py : `python` script to perform calculation on `ad_clicks.csv`