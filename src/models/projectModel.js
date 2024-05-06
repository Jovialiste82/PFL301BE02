// server/src/models/projectModel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Defining the schema for the Project
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    english: {
      type: String,
      required: true,
    },
    french: {
      type: String,
      required: true,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Compiling model from schema
const Project = mongoose.model("Project", projectSchema);

export default Project;
