// server/src/middleware/authMiddleware.js

const protect = async (req, res, next) => {
  const secret = req.body.secret;

  if (secret) {
    const isAuthorized = secret === process.env.SECRET;

    if (!isAuthorized) {
      res.status(401);
      throw new Error("Invalid secret");
    }

    next();
  } else {
    res.status(401).send({ error: "Secret field missing" });
  }
};

export { protect };
