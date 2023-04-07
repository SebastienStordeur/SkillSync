# SkillSync

SkillSync is a simple and user-friendly job platform that connects job seekers with exciting opportunities and helps companies find great talent. Job hunters can apply to jobs that match their skills, while companies can quickly create job postings to find their next team member. Built with TypeScript, React, Tailwind, Material-UI, Node, Express, GraphQL, and MongoDB.

Side project made to practice GraphQL.

# Table of Contents
Features
Getting Started
Prerequisites
Installation
Usage
Contributing
License
Features
Job seekers can browse and apply for jobs
Companies can create and manage job postings
Easy-to-use and visually appealing interface
Responsive design for mobile and desktop devices
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
Before you start, make sure you have the following installed on your machine:

Node.js (v14.0.0 or higher)
npm (v7.0.0 or higher)
MongoDB (v5.0.0 or higher)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/SebastienStordeur/skillsync.git
cd skillsync
Install the dependencies:

Copy code
cd server && npm install
cd client && npm install
Create a .env file in the root directory and fill in the required variables:

makefile
Copy code
MONGO_URL=mongodb://localhost:27017/skillsync
JWT_SECRET=your_jwt_secret
PORT=4000
Start the development server:

arduino
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to see the app in action.

Usage
Job seekers can sign up and log in to search for job postings.
Companies can sign up and log in to create and manage job postings.
Users can view job details and apply to jobs that match their skills.
Companies can manage their job postings and view applicants. (half implemented)

