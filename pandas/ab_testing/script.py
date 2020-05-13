import pandas as pd

ad_clicks = pd.read_csv('ad_clicks.csv')
# sample:
print(ad_clicks.head(10))

# add a new column called 'is_click' to ad_clicks dataframe
# whose value is True if the timestamp is not NaN
ad_clicks['is_click'] = ~ad_clicks.ad_click_timestamp.isnull()
print(ad_clicks.head(10))

# group views according to the 'utm_source' and count them
# reset_index() to get new dataframe
views_by_source = ad_clicks.groupby('utm_source').user_id.count().reset_index()
print(views_by_source)

# group 'actual' clicks by 'utm_source'
clicks_by_source = ad_clicks.groupby(['utm_source', 'is_click']).user_id.count().reset_index()
print(clicks_by_source)

# pivot clicks_by_source to make it more readable
clicks_pivot = clicks_by_source.pivot(
  columns='is_click',
  index='utm_source',
  values='user_id'
).reset_index()

# calculate the percentate of clicks attributed to each source
clicks_pivot['percent_clicked'] = 100 * (clicks_pivot[True]) / (clicks_pivot[True].sum())
print(clicks_pivot)

# group clicks by their respective sources
group = ad_clicks.groupby(['experimental_group', 'is_click']).user_id.count().reset_index()
print(group)

# pivot 'group' to make it readable
group_pivot = group.pivot(
  columns = 'is_click',
  index = 'experimental_group',
  values = 'user_id'
).reset_index()

# compare the percentage of clicks between the experimental groups 
group_pivot['click_percentage'] = 100 * group_pivot[True] / group_pivot[True].sum()
print(group_pivot)

# get the data pertaining to each experimental group
a_clicks = ad_clicks[(ad_clicks.experimental_group=='A')]
b_clicks = ad_clicks[(ad_clicks.experimental_group=='B')]
print(a_clicks)
print(b_clicks)

# breakdown of clicks by day: Monday to Sunday for each group
a_clicks_by_day = a_clicks.groupby(['day', 'is_click']).user_id.count().reset_index()
b_clicks_by_day = b_clicks.groupby(['day', 'is_click']).user_id.count().reset_index()
print(a_clicks_by_day)
print(b_clicks_by_day)

# pivot the above dataframes to make it more readable
a_clicks_by_day_pivot = a_clicks_by_day.pivot(
  columns='is_click',
  index='day',
  values='user_id'
)
b_clicks_by_day_pivot = b_clicks_by_day.pivot(
  columns='is_click',
  index='day',
  values='user_id'
)

# calculate the percentage of clicks per day per group
a_clicks_by_day_pivot['click_percent'] = 100 * a_clicks_by_day_pivot[True] / a_clicks_by_day_pivot[True].sum()
b_clicks_by_day_pivot['click_percent'] = 100 * b_clicks_by_day_pivot[True] / b_clicks_by_day_pivot[True].sum()

print(a_clicks_by_day_pivot)
print(b_clicks_by_day_pivot)

# for comparison, group by day, then group, then is_click
compare = ad_clicks.groupby(['day', 'experimental_group', 'is_click']).user_id.count().reset_index()
print(compare)

# extract 'actual' clicks from the 'compare' dataframe
compare_reach = compare[compare.is_click==True]
print(compare_reach)

# pivot 'compare_reach' to make it more readable
compare_reach_pivot = compare_reach.pivot(
  columns = 'experimental_group',
  index = 'day',
  values = 'user_id'
).reset_index()
print(compare_reach_pivot)