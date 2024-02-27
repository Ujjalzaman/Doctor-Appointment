# Doctor Appointment - Full Stack Appointment Website
Preview Website
https://dental-doctor-ujjal.netlify.app/

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
   - Copy DATABASE_PRIVATE_URL.
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
npm start

Happy coding! 🚀
```

Note: These are general instructions for setting up an Express API, and the specific implementation details may vary depending on your project's requirements. Before starting, make sure to read the project's documentation or readme file to obtain any specific instructions or requirements.

 
 This system offers a comprehensive and dynamic platform for managing doctor appointments, treatments, and patient interactions while maintaining high standards of code quality and user experience.

## Contact

Ujjalzaman - [@email](gmail.com) - ujjalzaman@gmail.com

Portfolio: [https://ujjalzaman-b6c8a.web.app/](https://ujjalzaman-b6c8a.web.app/)


#### What Technology are Using In This Projects

**Frontend Technology Stack:** 
- **React** : A JavaScript library for building user interfaces, offering a component-based architecture for creating interactive UIs.
- **Redux Toolkit:** A state management library for React applications, providing predictable state management with a single source of truth.
- **Ant Design:** A UI library for React applications, offering a set of customizable and pre-designed components.
- **React Hook Form:** A library for managing form state and validation in React applications, providing a simple and intuitive API.
- **Axios**: A promise-based HTTP client for making HTTP requests, used for interacting with backend APIs.

**Back-End:** 
- **Express.js:** A web application framework for Node.js, used for building robust APIs and web applications
- **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, used for database access and management.

 
# Sign In Page (In this component Especial for me becaouse i have did everthing functionaliy via vanila Javascript and Make this strong Pass and Validation )
![Sign in and SignUp](https://user-images.githubusercontent.com/49386888/128677862-6609539f-822a-40d1-aa46-743ed1071b73.png)

# Sign Up (In this component Especial for me becaouse i have did everthing functionaliy via vanila Javascript and Make this strong Pass and Validation )
![Signup](https://user-images.githubusercontent.com/49386888/128677874-cac290d9-a75f-4dee-9312-d6542162be0f.png)

## Landing Page
![0 home page](https://user-images.githubusercontent.com/49386888/128675084-ccdd2503-8305-4f3d-bf39-e68367969cc7.png)

# User Have to Logged in and Add his Appointment
![2 add appointment](https://user-images.githubusercontent.com/49386888/128675760-992691a8-978a-4aed-a9cc-dd3c693ec390.png)

# Get AppointMenet
![1 appointment](https://user-images.githubusercontent.com/49386888/128675791-2528fc5b-bd8f-4510-a487-6d71da9c79d8.png)

# Appointment
![3 doctor appointments](https://user-images.githubusercontent.com/49386888/128675842-601a2e14-e64b-4fd8-aea5-ff2dcfab3361.png)

# Daashboard (as i have left few functionality here for admin only )
![4 dashboard](https://user-images.githubusercontent.com/49386888/128675845-50a0c7dc-2d45-4d88-8b19-a825d4f8c138.png)

# All Patient List (this feature only visible for doctor's and admin )
![5 all patients](https://user-images.githubusercontent.com/49386888/128675846-cdb77ec8-d2fc-4184-9bff-715ed513862f.png)

