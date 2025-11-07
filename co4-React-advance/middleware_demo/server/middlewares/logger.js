// A simple custom middleware to log each request
module.exports = function logger(req, res, next) 
{
  const { method, originalUrl } = req;

  console.log(` ${method} request made to ${originalUrl}`);

  // Continue to the next middleware or route
  next();
};