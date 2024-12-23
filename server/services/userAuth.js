const jwt = require("jsonwebtoken");
const secret = "$AIML$";
function setUser(id, email) {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
}

function getUser(token) {
  try {
    console.log("token", token);
    if (!token) return null;
    const decode = jwt.verify(token, secret);
    console.log("decode", decode);
    return decode;
  } catch (e) {
    console.log(e);

    return e;
  }
}
module.exports = {
  setUser,
  getUser,
};
