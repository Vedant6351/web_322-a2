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

let projects = [];
let sectors = [];

//----------------------------------------------
// INITIALIZE DATA
//----------------------------------------------
function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/projectData.json", "utf8", (err, projectData) => {
      if (err) {
        reject("Unable to read projectData.json");
        return;
      }

      fs.readFile("./data/sectorData.json", "utf8", (err2, sectorData) => {
        if (err2) {
          reject("Unable to read sectorData.json");
          return;
        }

        try {
          const projectList = JSON.parse(projectData);
          const sectorList = JSON.parse(sectorData);

          // store originals
          projects = projectList;
          sectors = sectorList;

          // attach readable sector names to each project
          projects = projects.map((p) => {
            const sec = sectors.find((s) => s.id === p.sector_id);
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

          resolve("✅ Data successfully loaded");
        } catch (e) {
          reject("Error parsing JSON files: " + e);
        }
      });
    });
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
