const Candidate = require("../models/candidateModel");
const User = require("../models/userModel");

exports.createCandidate = async (req, res) => {
  try {
    const { name } = req.body;

    const candidate = await Candidate.create({ name });

    if (!candidate) {
      return res.status(500).json({
        message: " Candidate Creation Failed",
      });
    }

    res.status(201).json({
      message: "Candidate Created",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Creation Failed",
    });
  }
};

//Get Candidate list
exports.getCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (!candidates) {
      return res.status(500).json({ message: "Candidate list not found" });
    }

    res.status(201).json({ message: "Candidate list found", candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed" });
  }
};

// candidate vote thorugh select id

exports.voteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const userId  = req.user._id;

    
    // Check if the user has already voted
    const user = await User.findByIdAndUpdate(userId, {
      votedFor: candidateId,
    });
    if (user.votedFor) {
      return res.status(200).json({ message: "You have already voted." });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(401).json({
        message: "Candidate not found",
      });
    }
    candidate.votes++;
    await candidate.save();

    // Mark the user as voted
    user.votedFor = true;
    await user.save();

    res.status(201).json({
      message: "Vote recorded successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error recording vote",
    });
  }
};
