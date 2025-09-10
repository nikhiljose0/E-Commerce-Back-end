// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");


// app.use(express.json());
// app.use(cors());
// app.use('/images', express.static(path.join(__dirname, 'uploads')));


// // Database Connection With MongoDB
// mongoose.connect("mongodb+srv://nikhil8:Nikhil@cluster0.uc1wprr.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=E-commerce");

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB Connection Error:", err);
// });
// mongoose.connection.once("open", () => {
//   console.log("✅ MongoDB Connected");
// });

// // Image Storage Engine
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage: storage });

// // Upload endpoint
// app.post("/upload", upload.single("product"), (req, res) => {
//   res.json({
//     success: true,
//     image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//   });
// });

// app.use(cors({
//   origin: "https://your-frontend.vercel.app", // replace with your real frontend domain
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// app.use("/images", express.static("upload/images"));

// // Product schema
// const Product = mongoose.model("Product", {
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   new_price: { type: Number },
//   old_price: { type: Number },
//   date: { type: Date, default: Date.now },
//   available: { type: Boolean, default: true },
// });

// // Add product
// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

//   const product = new Product({
//     id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });

//   await product.save();
//   console.log("✅ Product Saved:", product);

//   res.json({ success: true, name: req.body.name });
// });

// // Remove product
// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("🗑 Product Removed");
//   res.json({ success: true, name: req.body.name });
// });

// // Get all products
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("📦 All Products Fetched");
//   res.send(products);
// });

// //creating endpoint for  newcolocetion data
// app.get("/newcollections", async (req, res) => {
// 	let products = await Product.find({});
//   let newcollection = products.slice(1).slice(-8);
//   console.log("New Collections");
//   res.send(newcollection);
// });



// //schema creating for User Model

// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// //Create an endpoint at ip/login for login the user and giving auth-token
// app.post('/login', async (req, res) => {
//   console.log("Login");
//     let success = false;
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//         const passCompare = req.body.password === user.password;
//         if (passCompare) {
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             }
// 			success = true;
//       console.log(user.id);
// 			const token = jwt.sign(data, 'secret_ecom');
// 			res.json({ success, token });
//         }
//         else {
//             return res.status(400).json({success: success, errors: "please try with correct email/password"})
//         }
//     }
//     else {
//         return res.status(400).json({success: success, errors: "please try with correct email/password"})
//     }
// })

// //Create an endpoint for regestring the user in data base & sending token

// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//         let success = false;
//         let check = await Users.findOne({ email: req.body.email });
//         if (check) {
//             return res.status(400).json({ success:false, errors: "existing user found with this email" });
//         }
//         let cart = {};
//           for (let i = 0; i < 300; i++) {
//           cart[i] = 0;
//         }
//         const user = new Users({
//             name: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             cartData: cart,
//         });
//         await user.save();
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
        
//         const token = jwt.sign(data, 'secret_ecom');
//         res.json({ success:true,token })
//     })


// app.get("/popularinwomen", async (req, res) => {
// 	let products = await Product.find({category:"women"});
//   let arr = products.splice(0,  4);
//   console.log("Popular In Women");
//   res.send(arr);
// });

// // MiddleWare to fetch user from database
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };


// // Add to Cart
// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Added", req.body.itemId);

//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;

//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );

//   res.json({ success: true, message: "Added to cart" });
// });

// // Remove from Cart
// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Removed", req.body.itemId);

//   let userData = await Users.findOne({ _id: req.user.id });

//   if (userData.cartData[req.body.itemId] > 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }

//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );

//   res.json({ success: true, message: "Removed from cart" });
// });

// //Creating get Cart
// app.post('/getcart',fetchuser,async (req,res)=>{
//   console.log("Getcart")
//   let userData = await Users.findOne({_id:req.user.id});
//   res.json(userData.cartData);
// })

// //Root route
// app.get("/", (req, res) => {
//   res.send("Express App is Running");
// });

// // Start server
// app.listen(port, (error) => {
//   if (!error) {
//     console.log("🚀 Server Running On Port " + port);
//   } else {
//     console.log("❌ Error: " + error);
//   }
// });
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(express.json());

// ✅ CORS - allow only your Vercel frontend
app.use(
  cors({
    origin: "https://e-commerce-front-end-trail.vercel.app", // your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Serve images correctly
app.use("/images", express.static(path.join(__dirname, "uploads/images")));

// ----------------- Database -----------------
mongoose.connect(
  "mongodb+srv://nikhil8:Nikhil@cluster0.uc1wprr.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=E-commerce"
);

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

// ----------------- Image Upload -----------------
const storage = multer.diskStorage({
  destination: "./uploads/images", // ✅ match static path
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
});

// ----------------- Product Schema -----------------
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Add product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  console.log("✅ Product Saved:", product);

  res.json({ success: true, name: req.body.name });
});

// Remove product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("🗑 Product Removed");
  res.json({ success: true, name: req.body.name });
});

// Get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("📦 All Products Fetched");
  res.send(products);
});

// New collections
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("✨ New Collections");
  res.send(newcollection);
});

// Popular in women
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  console.log("👗 Popular In Women");
  res.send(arr);
});

// ----------------- User Schema -----------------
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

// Signup
app.post("/signup", async (req, res) => {
  console.log("📝 Sign Up");
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User already exists with this email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password, // ⚠️ For real app, hash this!
    cartData: cart,
  });

  await user.save();
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// Login
app.post("/login", async (req, res) => {
  console.log("🔑 Login");
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password; // ⚠️ Use bcrypt in real app
    if (passCompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, "secret_ecom");
      return res.json({ success: true, token });
    }
  }
  return res
    .status(400)
    .json({ success: false, errors: "Invalid email or password" });
});

// ----------------- Middleware -----------------
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
};

// ----------------- Cart APIs -----------------
app.post("/addtocart", fetchuser, async (req, res) => {
  console.log("➕ Added to cart", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.json({ success: true, message: "Added to cart" });
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  console.log("➖ Removed from cart", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.json({ success: true, message: "Removed from cart" });
});

app.post("/getcart", fetchuser, async (req, res) => {
  console.log("🛒 Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// ----------------- Root -----------------
app.get("/", (req, res) => {
  res.send("🚀 Express App is Running");
});

// ----------------- Start Server -----------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
