# Online Doctor Appointment

Patients can select a desired doctor appointment date through the online platform. This project is developed using the MERN stack technology, and I have implemented various functionalities to make it a professional website. Currently, I do not have much time, but in the future, I plan to add additional functionality in the admin panel. For now, the current state is sufficient.

##Setting up this MERN project on your local machine typically involves the following steps:
###The front-end and Express code are in the same directory, with the Express API located at ./api
1. Clone or download the project source code to your local machine.
2. Install dependencies. This can be done using a package manager such as npm (Node Package Manager) or yarn.
3. Run the development server. This can be done using a command line tool such as the terminal, where you can run the command npm start or yarn start.
4. Access the project in your web browser by navigating to `http://localhost:3000` or another specified URL.

##To set up an Express API in the "./api" directory of a project, you can follow these steps:
1. Install the required dependencies. You can do this by running npm install or yarn install in the terminal and including the express module as a dependency.
2. Set up the server and configure middleware in a file such as index.js within the "./api" directory. You can do this by importing the express module and creating an instance of an express application, setting up routes for handling HTTP requests, and configuring middleware for handling requests and responses.
3. Set up environment variables for the project. This can be done by creating a file such as .env in the root directory and specifying key-value pairs for any environment-specific variables, such as a port number or database credentials.
For Example: create a file called .env and inside write.

```
MONGO=here will be your mongodb value      
JWT= Here will be your jason web token (Generate random number for secured your api).
```
3. Start the server by running a command such as node index.js or nodemon index.js in the terminal.
4. Test the API by sending HTTP requests to the server using tools such as Postman or cURL.

Note: These are general instructions for setting up an Express API, and the specific implementation details may vary depending on your project's requirements. Before starting, make sure to read the project's documentation or readme file to obtain any specific instructions or requirements.

## What Features Will You Find Here?
- Dynamic home page, serving as the landing page for all users.
- Admin and user dashboards.
- User login page with professional handling of all kinds of validations.
- Ability for a patient to select an appointment and view doctor information, as well as their own appointment information.
- Option to select a doctor and view appointment date.
- CRUD operations and additional features.
- Responsive design with a dynamic header and preloader.

```
**demo** : https://dental-doctor-ujjal.netlify.app/
**My Websit**e : https://ujjalzaman-b6c8a.web.app/
```


#### What Technology are Using In This Projects

**Front End :** 
- React
- JavaScript(ES6)
- React-Bootstrap
- Html
- css5
- Meterail UI
- React Animation
- Preloader
- Alert
- Validation

**Back-End:** 
- MongoDb
- Express
- Cors
- Body-Parse
- Nodemon
- ImageUploader 
 
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

