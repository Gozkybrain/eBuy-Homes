# Real Estate Properties API Documentation

Welcome to the Real Estate Properties API documentation. This comprehensive guide will help you understand how to interact with the API to retrieve information about various real estate properties.

## Base URL

The base URL for accessing the API is `http://localhost:3000/api`.

## Endpoints

### Get All Properties

- **Endpoint**: `/properties`
- **Method**: `GET`
- **Description**: This endpoint allows you to retrieve a list of all available real estate properties.
- **Example Request**: `GET http://localhost:3000/api/properties`
- **Response**: An array containing JSON objects representing each property.

### Get Property by ID

- **Endpoint**: `/properties/:id`
- **Method**: `GET`
- **Description**: Use this endpoint to retrieve detailed information about a specific property by its unique ID.
- **Parameters**:
  - `:id` (integer): The unique identifier of the property.
- **Example Request**: `GET http://localhost:3000/api/properties/1`
- **Response**: A JSON object representing the property with the specified ID.

### Search Properties by Type

- **Endpoint**: `/properties/type/:type`
- **Method**: `GET`
- **Description**: This endpoint allows you to search for properties of a specific type (e.g., Single Family Home, Condominium, Townhouse).
- **Parameters**:
  - `:type` (string): The type of property to filter by.
- **Example Request**: `GET http://localhost:3000/api/properties/type/Condominium`
- **Response**: An array containing JSON objects representing properties of the specified type.

### Search Properties by Price Range

- **Endpoint**: `/properties/price`
- **Method**: `GET`
- **Description**: Use this endpoint to find properties within a specified price range.
- **Query Parameters**:
  - `min` (number): The minimum price.
  - `max` (number): The maximum price.
- **Example Request**: `GET http://localhost:3000/api/properties/price?min=100000&max=500000`
- **Response**: An array containing JSON objects representing properties within the specified price range.

### Search Properties by Amenity

- **Endpoint**: `/properties/amenity/:amenity`
- **Method**: `GET`
- **Description**: This endpoint allows you to search for properties that offer a specific amenity.
- **Parameters**:
  - `:amenity` (string): The amenity to search for.
- **Example Request**: `GET http://localhost:3000/api/properties/amenity/Swimming%20Pool`
- **Response**: An array containing JSON objects representing properties that offer the specified amenity.

## Error Handling

- If a requested property ID, type, price range, or amenity does not match any records, the API returns a 404 (Not Found) response with an appropriate error message.
- In case of an internal server error during processing, the API returns a 500 (Internal Server Error) response with an error message.

## Authentication

No authentication is required to access the API endpoints.

## Rate Limiting

There are currently no rate limits imposed on API requests.

## Support

For any questions, feedback, or issues related to the API, please contact our support team at gozkybrain@gmail.com.

This documentation provides detailed information on each endpoint available in the Real Estate Properties API, including examples of requests and responses, parameters, and error handling. It aims to assist developers in efficiently utilizing the API to retrieve real estate property data for various purposes.