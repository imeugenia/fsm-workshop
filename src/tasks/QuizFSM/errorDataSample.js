// Possible error response codes:
// 1 - No Results Could not return results.
// 2 - Invalid Parameter Contains an invalid parameter.
// 3 - Token Not Found Session Token does not exist.
// 4 - Token Empty Session Token has returned all possible questions for the
//     specified query.

const errorResponse = {
  response_code: 1,
  results: [],
};
