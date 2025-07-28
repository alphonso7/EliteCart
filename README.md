## 🛒 **EliteCart – MERN Fashion E-Commerce Website**

EliteCart is a fully functional fashion E-Commerce platform built with the MERN stack (MongoDB, Express, React, Node). It offers recommendations based on color similarity and k-means clustering, with core shopping features like cart, orders, profile management, and admin control.

🔗 Live Repo: [EliteCart GitHub](https://elitecart-frontend.netlify.app/)

--------------------
### 🚀 **Features**: 

- 👤 User Registration & Login (Implemented bcrypt with jwt). 

- 🛍️ View All Products (images stored in MongoDB). 

- 🎨Recommendation based on mood and Color Similarity.

- 🛒 Cart & Checkout Flow

- ✅ Place Orders (without payment)

- 🧾 User Profile with Edit Support

- 📦 Order History in My Orders

- 🧑‍💼 Admin Panel for Managing Products, Users, Orders

- 📧 Order confirmation via Email (Using nodemailer).

Note: Admin panel is not deployed yet. 

### EliteCart Setup guide 

- Clone the repo 
``` 
git clone https://github.com/alphonso7/EliteCart.git
cd EliteCart
```

- Run the backend
```
cd backend
npm install
# Create a `.env` file (see config section below)
npm start
```

- Run the frontend
```
cd ../frontend
npm install
# Update base API URL in .env
npm run dev
```

- Run the Admin panel (Optional)
```
cd ../admin
npm install
# Update API URL in .env
npm run dev
```

- Configuration

  - Update the .env file inside backend
  ```
    MONGO_URI=mongodb+srv://<your-db-uri>
    JWT_SECRET=your_jwt_secret
    SMTP_USER=your_smtp_email@gmail.com
    SMTP_PASS=your_smtp_password
    FRONTEND_BASE_URL=http://localhost:5000
    ADMIN_BASE_URL=http://localhost:4000

  ```

    - Update the .env file inside frontend
    ```
    VITE_API_URL=http://localhost:3000
    ```

    - Update the .env file inside admin
    ```
    VITE_API_URL=http://localhost:3000
    ```


### 📌 Future Scope
- Payment Gateway Integration

- Inventory Stock Management

- Add Wishlist Feature

- Social Login Support


### 📄 License
This project is licensed under the AGPL-3.0 License.  
You may use, modify, or distribute the code for non-commercial purposes only.  
Any commercial use or deployment must disclose source code and changes made.


### Open for collaborations and edits
Contact on linked in (Link in the profile).