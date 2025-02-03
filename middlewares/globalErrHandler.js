export const globalErrHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const status = err?.statusCode ? err?.statusCode : 500;
  const message = err?.message;
  res.status(status).json({
    stack,
    message,
  });
};

//Not found 404

export const notFound = (req, res, next) => {
  const err = new Error("Page not found!!!");
  console.log("page not found!!!");
  next(err);
};
