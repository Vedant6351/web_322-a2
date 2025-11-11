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

const fs = require("fs");
const path = require("path");

let projects = [];
let sectors = [];

// ✅ Build absolute file paths (works on both local + Vercel)
const projectDataPath = path.join(__dirname, "../data/projectData.json");
const sectorDataPath = path.join(__dirname, "../data/sectorData.json");

//----------------------------------------------
// INITIALIZE DATA
//----------------------------------------------
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      const projectData = fs.readFileSync(projectDataPath, "utf8");
      const sectorData = fs.readFileSync(sectorDataPath, "utf8");

      const projectList = JSON.parse(projectData);
      const sectorList = JSON.parse(sectorData);

      projects = projectList.map((p) => {
        const sec = sectorList.find((s) => s.id === p.sector_id);
        return {
          id: p.id,
          name: p.title,
          description: p.summary_short,
          sector: sec ? sec.sector_name : "Unknown",
          image: p.feature_img_url,
          impact: p.impact,
          link: p.original_source_url,
        };
      });

      sectors = sectorList;
      resolve("✅ Data successfully loaded");
    } catch (err) {
      reject("❌ Unable to read or parse data files: " + err);
    }
  });
}

//----------------------------------------------
// GET ALL PROJECTS
//----------------------------------------------
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) resolve(projects);
    else reject("No projects available");
  });
}

//----------------------------------------------
// GET PROJECT BY ID
//----------------------------------------------
function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const found = projects.find((p) => p.id == id);
    found ? resolve(found) : reject("No project found with that ID");
  });
}

//----------------------------------------------
// GET PROJECTS BY SECTOR (sector name string)
//----------------------------------------------
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const matches = projects.filter(
      (p) => p.sector.toLowerCase() === sector.toLowerCase()
    );
    matches.length > 0
      ? resolve(matches)
      : reject("No projects found in that sector");
  });
}

//----------------------------------------------
// EXPORT FUNCTIONS
//----------------------------------------------
module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};
