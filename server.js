/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Vedant Kalpit Pandit   Student ID: 162915235   Date: 2025-11-10
*
********************************************************************************/

const express = require("express");
const app = express();
const path = require("path");
const dataService = require("./modules/projects");

const PORT = process.env.PORT || 8080;

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Initialize data
dataService.initialize()
  .then(() => {
    console.log("✅ Data successfully initialized");
  })
  .catch((err) => {
    console.log("❌ Data initialization error:", err);
  });


  
// ---------------------- ROUTES ----------------------

// HOME PAGE (renders projects)
app.get("/", (req, res) => {
  dataService.getAllProjects()
    .then((projects) => {
      projects.sort((a, b) => a.name.localeCompare(b.name));
      res.render("home", { projects });
    })
    .catch((err) => {
      console.log("Error loading projects:", err);
      res.render("home", { projects: [] });
    });
});

// ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about");
});

// ALL PROJECTS
app.get("/solutions/projects", (req, res) => {
  dataService.getAllProjects()
    .then((projects) => {
      projects.sort((a, b) => a.name.localeCompare(b.name));
      res.render("projects", { projects });
    })
    .catch((err) => {
      res.status(500).render("404", { message: "Error loading projects" });
    });
});

// PROJECTS BY SECTOR
app.get("/solutions/projects/sector/:sector", (req, res) => {
  const sector = req.params.sector;
  dataService.getProjectsBySector(sector)
    .then((projects) => {
      projects.sort((a, b) => a.name.localeCompare(b.name));
      res.render("projects", { projects });
    })
    .catch(() => {
      res.status(404).render("404", { message: "No projects found for this sector" });
    });
});

// PROJECT DETAILS
app.get("/solutions/projects/:id", (req, res) => {
  const id = req.params.id;
  dataService.getProjectById(id)
    .then((project) => {
      res.render("projectDetails", { project });
    })
    .catch(() => {
      res.status(404).render("404", { message: "Project not found" });
    });
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
