const users = [];

// Add a new user
function addUser(username, password) {
  users.push({ username, password });
}

// Find a user by username
function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

// Verify user credentials
function verifyUser(username, password) {
  const user = findUserByUsername(username);
  return user && user.password === password;
}

module.exports = {
  addUser,
  findUserByUsername,
  verifyUser,
};
