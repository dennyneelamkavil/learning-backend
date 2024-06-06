const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error.message);
    res.status(error.status || 500).send("Error: " + error.message);
  }
};
module.exports = asyncHandler;