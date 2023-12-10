SELECT 
    property.id AS id,
    title,
    cost_per_night,
    AVG(rating) AS average_rating
FROM properties as property 
INNER JOIN property_reviews as review
    ON property.id = review.property_id
WHERE property.city LIKE '%ancouv%'
GROUP BY property.id
HAVING AVG(rating) >= 4
LIMIT 10;

