# **RBAC Frontend**

This repository contains the frontend code for a **Role-Based Access Control (RBAC)** system. It is built using **React**, **Vite**, **Redux**, and **TailwindCSS** for styling. The frontend interacts with the backend API to manage users, roles, permissions, and image uploads.

---

## **Features**
- **User Management**:
  - Add, edit, delete, and fetch users.
  - Manage user roles and permissions.
- **Role Management**:
  - Assign and update roles (`user`, `admin`, `subadmin`).
- **Permission Management**:
  - Update Permission Like (*Store Managment*,*Wallet Managment*,*Blog Managment*).
- **Image Upload**:
  - File uploads via **Cloudinary**.

---

## Setup Instructions

1. Clone the Project
```
    git clone https://github.com/vedantxtrem/RBAC-frontend.git
```
2. Setup Environment Variables
```
    VITE_API_BASE_URL="http://localhost:5000/api/v1/"
```
3. Install dependecies 
```
    npm i 
```
4. Run the server
```
    npm run dev
```
# Folder Structure
```
RBAC/
├── node_modules/
├── public/
│ └── assets/
│ └── admin.svg
├── src/ │
├── assets/
│ ├── components/
│ │ ├── AddUser.jsx
│ │ ├── Calendar.jsx
│ │ ├── EditProfile.jsx
│ │ └── Sidebar.jsx
│ ├── Helper/
│ │ └── axiosInstance.js
│ ├── Layout/
│ │ └── HomeLayout.jsx
│ ├── Pages/
│ │ ├── HomePage.jsx
│ │ ├── NotFound.jsx
│ │ ├── Profile.jsx
│ │ └── User.jsx
│ ├── Redux/
│ │ ├── Slice/
│ │ │ └── UserSlice.js
│ │ └── store.js
├── App.css
├── App.jsx
├── index.css
├── index.html
├── main.jsx
├── .env
├── .eslintrc.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```
## Amdin Dashboard
![Amdin Dashboard](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732644201/rbac/hzylg0qfembix5n8tzgk.png)

## User Manage Page
![Amdin Dashboard](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732644306/rbac/oufgzidbbmlds630zjme.png)

## Add User
![Amdin Dashboard](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732644391/rbac/ehe0s5dolbd2ihydncal.png)

##  Profile Page 
![Profile Page ](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732643863/rbac/jlby1rjwixu9dtlehrpb.png)

##  Edit Profile  
![Amdin Dashboard](https://res.cloudinary.com/dt5akmcnd/image/upload/v1732644051/rbac/orjsp0p5vdxmbohqfksl.png)





## Deployment

The RBAC system is deployed on Vercel.  
You can access it here: [https://vrv-rbac.vercel.app/](https://vrv-rbac.vercel.app/)  
Note :- Its Backend will take time to start 1 min Beacause It hosted on Free Tier on Render .

## Contributors
### Vedant Sahu
#### ReactJS, Tailwindcss, NodeJS , NextJS , Express MonogoDB , TypeScript , JavaScript
<a href="https://in.linkedin.com/in/vedant-sahu-b4298324a" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
<a href="https://github.com/vedantxtrem" target="_blank">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<a href="https://www.instagram.com/vedant_xtrem_99/" target="_blank">
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram">
</a>

<a href="mailto:vedant@ssipmt.com" target="_blank">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
</a>


**For questions or feedback, feel free to contact me!**

