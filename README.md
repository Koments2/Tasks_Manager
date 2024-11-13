# Task Management Application

This is a task management application built with **React**, **Redux**, and **TypeScript**. It allows users to manage tasks, including creating, editing, deleting, and assigning categories. The app supports uploading and previewing images, as well as tracking the status of tasks.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This task management app allows users to interact with tasks through a user-friendly interface. The app includes the following key features:

- **Task Creation and Editing:** Users can create new tasks and edit existing ones.
- **Image Uploading:** Users can upload images related to their tasks, which are previewed before submission.
- **Task Status Management:** Track the status of tasks, with options like "In Progress" and "Completed."
- **Form Validation:** Form inputs are validated, with error messages if required fields are missing.
- **Redux State Management:** The application uses Redux for state management, particularly for handling tasks and user interactions.

## Installation Instructions

Follow the steps below to get the application up and running locally.

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/task-management.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd task-management
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

   Or if you're using Yarn:

    ```bash
    yarn install
    ```

4. **Create an `.env` file** in the root directory and add any required environment variables (such as API URLs, etc.). Example:

    ```env
    REACT_APP_API_URL=https://your-api-url.com
    ```

5. **Start the development server**:

    ```bash
    npm start
    ```

   Or if using Yarn:

    ```bash
    yarn start
    ```

   The app will be available at `http://localhost:3000`.

## Usage

After setting up the app, you can access the following features:

- **Task List:** View a list of all tasks.
- **Create/Edit Task:** Add or modify tasks using the provided form, which includes fields such as title, description, status, and image upload.
- **Image Upload:** Select an image for a task. If an image is not selected, the existing image (if any) will be retained.
- **Task Status:** Change the task status (e.g., "In Progress", "Completed").
- **Form Validation:** Required fields (like title and description) are validated before submission.
  Features
  Task Form: Users can fill out a form to create or edit tasks. The form includes various field types such as text inputs, select options, and file uploads.
  Image Preview: When a user selects an image, it is previewed in the form before submission.
  Redux State Management: All task data, including the list of tasks, is stored and managed in the Redux store, allowing efficient state handling and updates.
  Error Handling: The form includes validation for required fields, with error messages displayed if fields are missing.
  Navigation: Upon successful task editing, users are redirected to the task list page.
  Technologies Used
  React: The frontend library used to build the user interface.
  Redux: State management to handle tasks and application data.
  React Hook Form: Form handling library used for managing form inputs and validation.
  TypeScript: TypeScript is used for type safety throughout the application.
  CSS Modules: Scoped CSS styling for each component.
  Contributing
  We welcome contributions! Here's how you can help:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request with a detailed description of your changes.
Please ensure your code adheres to the code style guidelines and includes tests where applicable.