SELECT 
	property.id,
	title,
	start_date,
	cost_per_night,
	AVG(rating)
FROM reservations as reservation
INNER JOIN properties AS property
	ON  reservation.property_id = property.id
INNER JOIN property_reviews as review
	ON  review.property_id = property.id
WHERE reservation.guest_id = 1
GROUP BY property.id, property.title, property.cost_per_night, reservation.start_date
ORDER BY start_date;