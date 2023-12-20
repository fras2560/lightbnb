const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  console.log(email);
  return pool
  .query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  ).then((result) => {
    console.log(result.rows);
    return (result.rows.length > 0) ? result.rows[0] : null; 
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
  .query("SELECT id, name, email, password FROM  users WHERE id =$1 LIMIT 1;",
    [id]
  ).then((result) => {
    return (result.rows.length > 0) ? result.rows[0] : null; 
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
  .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [user.name, user.email, user.password]
  ).then((result) => {
    console.log(result);
    return (result.rows.length > 0) ? result.rows[0] : null; 
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  let filterUser = '';
  let params = [limit];
  if (guest_id) {
    filterUser = 'AND reservation.guest_id = $2';
    params.push(guest_id);
  }
  return pool
  .query(
    `SELECT * FROM properties AS property
      INNER JOIN reservations AS reservation
        ON property.id = reservation.property_id
    WHERE 1=1 ${filterUser}
    LIMIT $1
    `,
    params
  ).then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Properties

const convertToCents = function(price) {
  return price * 100;
}

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [limit];
  let queryConditions = '';
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryConditions += ` AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryConditions += ` AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(convertToCents(options.minimum_price_per_night));
    queryConditions += ` AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(convertToCents(options.maximum_price_per_night));
    queryConditions += ` AND cost_per_night <= $${queryParams.length} `;
  }

  let ratingQuery = '';
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    ratingQuery = `HAVING AVG(rating) >= $${queryParams.length}`;
  }
  return pool
  .query(
    `SELECT 
        property.*,
        AVG(rating) AS average_rating
    FROM properties as property 
    LEFT JOIN property_reviews as review
        ON property.id = review.property_id
    WHERE 1=1 ${queryConditions}
    GROUP BY property.id
    ${ratingQuery}
    LIMIT $1;
    `,
    queryParams
  ).then((result) => {
    console.log(result.rows);
    console.log(queryParams);
    console.log(queryConditions);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool
  .query(`
    INSERT INTO properties
    (
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
        country,
        city,
        street,
        province, 
        postal_code
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `,
    [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      convertToCents(property.cost_per_night),
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.country,
      property.city,
      property.street,
      property.province, 
      property.post_code
    ]
  ).then((result) => {
    console.log(result);
    return (result.rows.length > 0) ? result.rows[0] : null; 
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
