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

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  return pool
  .query(
    'SELECT * FROM properties LIMIT $1',
    [limit]
  ).then((result) => {
    console.log(result.rows);
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
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
