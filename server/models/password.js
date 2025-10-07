import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  site: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Password", passwordSchema);
