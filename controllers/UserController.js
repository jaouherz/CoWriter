require("dotenv").config();
const UserService = require("../services/userService");
const { UserModel } = require("../models/User");
class UserController {
    static async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    static async createUser(userData) {
        try {
            const newUser = new User(userData);
            return await newUser.save();
        } catch (error) {
            console.error("Error saving user:", error);
            return null;
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = await UserService.updateUser(userId, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error updating user:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await UserService.deleteUser(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
    static async activateUser(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await UserService.activateUser(id);
            res.status(200).json({ message: "User activated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error activating user:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    static async getInactiveUsers(req, res) {
        try {
            const inactiveUsers = await UserModel.find({ isActivated: false });
            res.status(200).json({ users: inactiveUsers });
        } catch (error) {
            console.error("Error fetching inactive users:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}

module.exports = UserController;
