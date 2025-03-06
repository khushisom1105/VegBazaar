const { getAllUsers } = require("../services/userOperation");

const getAllUser = async(req,res) =>{
      const data = await getAllUsers()
      console.log(data);
      res.status(200).json({
        message: "Users fetched successfully",
        data,
      });
}
module.exports = {getAllUser}