# ShelfLog – Personal Book Logging App

This is a simple Personal Book Logging App developed using the MERN full-stack. The system demonstrates user registration and login functionalities with **_JWT Authentication(access and refresh Token generation + refresh Token rotation and reuse detection)_** and email verification using `Nodemailer`.

**ShelfLog** is a _personal book logging application_ that allows users to easily manage their reading journey. With **ShelfLog**, you can **add books** by specifying the _title_, _author_, and _category_, and later **update** or **edit** book details. You can also **add notes** to each book, **update the reading status** (such as **Read**, **Reading**, or **Completed**), or **delete books** from your collection. **ShelfLog** helps you keep track of your reading progress and organize your personal library efficiently.

## Prerequisites

Before running the application, ensure you have the following installed:

1. Node.js
2. git

# Getting Started

Follow these steps to run the application locally:

To get started, clone this repository to your local machine.

```bash
git clone https://github.com/aynuayex/ShelfLog
cd ShelfLog
```

## Setting up the Frontend

1. Navigate to the project directory:
   `cd client
`
2. Install dependencies:
   `npm install`

3. In the root of the **client** folder create a `.env.local` file if it didn't already exist and inside paste the `VITE_BASE_API` like shown below.so, it should look like this:
   ```
   VITE_BASE_API=http://localhost:5000/api/v1
   ```
4. Start the frontend:
   `npm run dev`

## Setting up the API

1. Navigate to the project directory:
   `cd server
`
2. Install dependencies:
   `npm install`

3. - Go to [Mongodb](https://cloud.mongodb.com/) and create a new Project and obtain the database URL connection string
     and in the root of the **server** folder create a `.env` file and inside paste to the value of **MONGO_URI**, add the **FRONTEND_URL** and also add the **PORT**, **NODE_ENV** like shown below.so, it should look like this:
     ```bash
     PORT=5000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:5173
     MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.ozx0o.mongodb.net/ShelfLogDB?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Add **USER** and **APP_PASS** which are needed for the nodemailer to work properly.so, add your email address for the former and for the latter use **_App Password_**

     #### Generate an App Password:

     - Go to [App Passwords](https://myaccount.google.com/apppasswords).
     - Select Mail as the app and "Other (Custom)" as the device.
     - give your app a name,example `ShelfLog`
     - Generate and copy the 16-character password.

     ```
     USER=aynuman19@gmail.com
     APP_PASS="paste here the 16-character password"
     ```

   - **ACCESS_TOKEN_SECRET** and **REFRESH_TOKEN_SECRET**: These are encryption keys used to sign the JWT tokens. You should generate these keys using the following command in Node.js:

     ```js
     require("crypto").randomBytes(64).toString("hex");
     ```

     After running the above command in the Node CLI, copy the generated secret and add it to the .env file:

     ```bash
     ACCESS_TOKEN_SECRET=secret_key
     REFRESH_TOKEN_SECRET=secret_key
     ```

4. Start the backend server:
   `npm run dev`

   The server should now be running on http://localhost:5000.

## If I Had More Time

Given more time, I would enhance the project by:

1. Changing All API calls using react query hooks, useQuery and useMutation
2. implement forgot password
