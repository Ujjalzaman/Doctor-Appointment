# Doctor Appointment - Full Stack Appointment Website

## 👨‍💻 Actively Seeking Better Opportunities
#### 🌟 Open to vacancies, jobs, or contract roles 🚀

### Installation video
[![YouTube](https://img.shields.io/badge/Watch_on-YouTube-red?logo=youtube)](https://youtu.be/L6cgb7I-Ap4)&nbsp;&nbsp;&nbsp;&nbsp;

[![Preview](https://img.shields.io/badge/Preview_on-Netlify-brightgreen?logo=netlify)](https://dental-doctor-ujjal.netlify.app/)&nbsp;&nbsp;&nbsp;&nbsp;[![Live Preview](https://img.shields.io/badge/Live_Preview-Netlify-blue?logo=netlify)](https://dental-doctor-ujjal.netlify.app/)


##### To Setup Project Follow `project_setup.txt` documentation

## About The Project
The `DoctorOnCall` System facilitates patients in scheduling appointments with preferred doctors or Emergency Appointments set up via an online platform.
Developed using the React, Nodejs, and Prisma stack, it offers a professional website with dynamic functionalities. Key features include dynamic home, Email Notification, Filtering doctors, Setting up appointments and patients/doctors dashboards, secure user login with validation mechanisms, appointment scheduling with access to doctor details, patient appointment management, doctor selection, and overall industries level code splitting followed.

## What Features Will You Find Here:
 - **Dynamic Homepage:** Conveniently gathers essential information on a single page.
 - **Easy Appointment Setup:** Seamlessly schedule appointments with doctors, featuring selectable available dates and time ranges.
 - **Dynamic Appointment Management:** Flexible time and date range selection for appointments.
 - **Doctor Selection:** Patients can choose their preferred doctor for appointments.
 - **Industry-standard Code Quality:** Utilization of top-notch code conventions, code splitting, and TypeScript in backend development.
 - **Email Notifications:** Automated email notifications for appointment setup and invoicing.
 - **Doctor Dashboard:** Dynamic dashboard for doctors to access patient information and provide online treatment with customizable prescriptions.
 - **Patient Dashboard:** Patients can track their treatment progress, view medications, prescriptions, and appointment details from a dynamic dashboard.
 - **Appointment Tracking:** Track appointment status using a unique tracking ID directly from the homepage.
 - **Dynamic Prescription and Invoice Generation:** Customized prescriptions and invoices tailored to each appointment.
 - **User Authentication:** Dynamic authentication system allowing user sign-in, sign-up, password recovery, and email verification (for doctors).
 - **Dynamic Doctor Filtering:** Advanced filtering options for doctors and appointment scheduling, along with blogging and service features.
 - **Ongoing Development:** Continued enhancements with an evolving admin system.
 - **Best Practices:** Adherence to industry best practices, ensuring reusable and maintainable code.

<!-- GETTING STARTED -->
## Getting Started
To begin using the DoctorOnCall System, follow these simple steps:

### Prerequisites
Before getting started with the DoctorOnCall System, ensure that you have the following prerequisites installed and set up:
* Install Node.js (globally)
  ```sh
  npm install npm@latest -g
  ```
* Prisma CLI: If you're planning to work on the backend part, you'll need to have Prisma CLI installed globally. You can install it using npm:
  ```sh
   npm install -g prisma
  ```
* TypeScript (optional): TypeScript is used in the backend, ensure that you have TypeScript installed globally. You can install it using npm:
  ```sh
   npm install -g typescript
  ```

## Installation
To begin using the DoctorOnCall System, follow these simple steps:
### The front-end and Backend code are in the same directory, with the Backend API located at the ./api directory

```
# Setup Documentation

## Clone The Project
git clone https://github.com/Ujjalzaman/Doctor-Appointment.git

### Install Frontend
cd Doctor-Appointment
- npm install
- npm start

### Install Backend
cd api
- npm install

### Setup Database
1. Rename .env.example to .env (remove .example).
2. Create a PostgreSQL Database (Railway if you don't have one installed locally):
   - Create an account at https://railway.app/.
   - Navigate to the New Section > Database > Add PostgreSQL.
   - Select your created database and go to the Variables tab.
   - Copy DATABASE_PUBLIC_URL.
   - Paste the database URL into the .env file.

### Install Prisma
- npm install -g prisma
- npx prisma generate
- npx prisma migrate dev

### Setup Google App Password (For Email Notification)
1. Go to Google Account settings at https://myaccount.google.com/security?hl=en.
2. Navigate to Security > 2-Step Verification.
3. Scroll to the bottom of the page and find App passwords.
4. Select your project name and copy the generated password.
5. Paste the app password into .env as EMAIL_PASS.

### Setup Cloudinary to Upload Image
1. Create a Cloudinary Account at https://cloudinary.com/.
2. Login to your Cloudinary Account and copy all the credentials (e.g., Cloud name, API key, API secret).
3. Paste those credentials into the .env file.

### Start Backend
npm run dev

Happy coding! 🚀
```

Note: Please note that these are general instructions for setting up an Express API, and the specific implementation details may vary depending on your project's requirements. Before starting, make sure to read the project's documentation or readme file to obtain any specific instructions or requirements.

 
 This system offers a comprehensive and dynamic platform for managing doctor appointments, treatments, and patient interactions while maintaining high standards of code quality and user experience.

#### What Technology Are Using In This Project

**Frontend Technology Stack:** 
- **React**: A JavaScript library for building user interfaces, offering a component-based architecture for creating interactive UIs.
- **Redux Toolkit:** A state management library for React applications, providing predictable state management with a single source of truth.
- **Ant Design:** A UI library for React applications, offering a set of customizable and pre-designed components.
- **React Hook Form:** A library for managing form state and validation in React applications, providing a simple and intuitive API.
- **Axios**: A promise-based HTTP client for making HTTP requests, used for interacting with backend APIs.

**Back-End:** 
- **Express.js:** A web application framework for Node.js, used for building robust APIs and web applications
- **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, used for database access and management.

 ## Project Screenshot
![DoctorOnCall OverView](https://github.com/Ujjalzaman/Doctor-Appointment/assets/49386888/eeed56ce-3d9a-464d-91e5-588ea81ec5c0)

## Contributing:

1. Fork the repository by clicking the "Fork" button on the top right corner of the project's GitHub page. This will create a copy of the project in your own GitHub account.

2. Clone the forked repository to your local machine by running the command ``` git clone https://github.com/your-username/online-doctor-appointment.git ``` in your terminal.

3. Install the project's dependencies by running npm install or yarn install in the project's root directory.
Create a new branch for your changes by running the command ``` git checkout -b branch-name ```, where branch-name is a descriptive name for your branch.
Make your desired changes to the code.

4. Test your changes locally by running npm start or yarn start and accessing the project in your web browser at ``` http://localhost:3000 ``` or another specified URL.
5. Add and commit your changes to your local repository by running the command git add . followed by ``` git commit -m "Your commit message here" ```

6. Push your changes to your forked repository by running the command ``` git push origin branch-name ```

7. Create a pull request (PR) by navigating to your forked repository on GitHub and clicking the "New pull request" button. Make sure that the base branch is set to the original project's branch that you want to contribute to, and the head branch is set to your forked repository's branch that contains your changes.

8. Write a descriptive title and message for your pull request, explaining the changes you made and why they should be merged.
Wait for the project's maintainers to review your pull request and provide feedback. You may be asked to make further changes or address any issues before your changes are merged.

9. Once your pull request is approved and merged, your changes will become part of the project. Congratulations, you have successfully contributed to the project!

Thank you for considering this project. If you have any questions, please do not hesitate to contact me.


## Contact Me
Portfolio: [https://ujjalzaman.netlify.app/](https://ujjalzaman.netlify.app/)
