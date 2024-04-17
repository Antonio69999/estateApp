import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //hash passsword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  //creaete a new user and save to db
};
export const login = (req, res) => {
  //db operations
};
export const logout = (req, res) => {
  //db operations
};
