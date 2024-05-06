// server/src/controllers/projectController.js
import Project from "../models/projectModel.js";

// Function to get all active projects from the database
export const getActiveProjects = async (req, res) => {
  try {
    // Find all projects where 'active' is true
    const activeProjects = await Project.find({ active: true });

    // Send the found projects as a JSON response
    res.status(200).json(activeProjects);
  } catch (error) {
    // If an error occurs, send an error response
    res
      .status(500)
      .json({ message: "Failed to retrieve projects", error: error.message });
  }
};

// Function to add a new project to the database (PostMan)
export const addProject = async (req, res) => {
  const { title, description, imageUrl, link } = req.body;
  console.log("message received: ", title);
  console.log("message received: ", description);
  console.log("message received: ", imageUrl);
  console.log("message received: ", link);

  // Create a new project document from the model
  const newProject = new Project({
    title,
    description,
    imageUrl,
    link,
  });

  try {
    // Save the project to MongoDB
    await newProject.save();
    res.status(200).send("Project added successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to add project");
  }
};
