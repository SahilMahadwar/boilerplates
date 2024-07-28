import { asyncHandler } from "../middlewares/async-handler.middleware";
import { User } from "../models/user.model";
import { ErrorResponse } from "../utils/error-response.util";

// Create a new user
export const createUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  return res.respond({
    statusCode: 201,
    data: { user: newUser },
    message: "User created successfully",
  });
});

// Get all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (users.length === 0) {
    return next(
      new ErrorResponse({ message: "No users found", statusCode: 404 })
    );
  }

  return res.respond({
    statusCode: 200,
    data: { users },
    message: "Fetched users successfully",
  });
});

// Get a single user by ID
export const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(
      new ErrorResponse({ message: "User not found", statusCode: 404 })
    );
  }

  return res.respond({
    statusCode: 200,
    data: { user },
    message: "Fetched user successfully",
  });
});

// Update a user by ID
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(
      new ErrorResponse({ message: "User not found", statusCode: 404 })
    );
  }

  return res.respond({
    statusCode: 200,
    data: { user: updatedUser },
    message: "User updated successfully",
  });
});

// Delete a user by ID
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return next(
      new ErrorResponse({ message: "User not found", statusCode: 404 })
    );
  }

  return res.respond({
    statusCode: 200,
    data: {},
    message: "User deleted successfully",
  });
});
