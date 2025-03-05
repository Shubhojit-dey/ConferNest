import { User } from "../models/userModel.js";
import { Meeting } from "../models/meetingModel.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // alert("Username already exists");
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    user.token = token;
    res.json({ token });

    await user.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
      const user = await User.findOne({ token: token });
      const meetings = await Meeting.find({ user_id: user.username })
      res.json(meetings)
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
      const user = await User.findOne({ token: token });

      const newMeeting = new Meeting({
          user_id: user.username,
          meetingCode: meeting_code
      })

      await newMeeting.save();

      res.status(httpStatus.CREATED).json({ message: "Added code to history" })
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

const deleteMeeting = async (req, res) => {
  const { token, meeting_code } = req.body;
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Meeting.deleteOne({ user_id: user.username, meetingCode: meeting_code });
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAllHistory = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Meeting.deleteMany({ user_id: user.username });
    res.status(200).json({ message: "All meeting history deleted successfully" });
  } catch (error) {
    console.error("Error deleting all history:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export { login, register, getUserHistory, addToHistory, deleteMeeting, deleteAllHistory};
