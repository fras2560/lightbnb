SELECT
	city,
	COUNT(*) AS total_reservations
FROM properties as property
INNER JOIN reservations as reservation
	ON property.id = reservation.property_id
GROUP BY city
ORDER BY COUNT(*) DESC;