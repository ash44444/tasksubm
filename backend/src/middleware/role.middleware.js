
module.exports = (role) => (req, res, next) => {
  try {
    if (req.user.role !== role) {
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }

    next();
  } catch (err) {
    next(err);
  }
};
