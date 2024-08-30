const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//database connection with mongodb

mongoose.connect(
  "mongodb+srv://amitpattanaik987:Amit1234@e-commerce.mceyl.mongodb.net/e-commerce"
);

//Api creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

//image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

//creating upload endpoint for images

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  let image_filename = req.file.filename;
  res.json({
    success: 1,
    image_url: image_filename,
  });
});

//Product from the Admin page Schema

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_prices: {
    type: Number,
    required: true,
  },
  old_prices: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//Schema creating for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//Creating end point for registering the user
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username);
  console.log(email);
  console.log(password);

  let check = await Users.findOne({ email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing User Found With same Email Address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: username,
    email: email,
    password: password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  return res.json({ success: true, token });
});

//Creating End point for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email });

  if (user) {
    const passCompare = password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

//creating api for adding products

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_prices: req.body.new_prices,
    old_prices: req.body.old_prices,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api for deleting products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//creating end point for newcollection data
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("new collection fetched");
  res.send(newcollection);
});

//creating endpoint for popular in women section

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popularinwomen);
  console.log(popularinwomen);
});

//creating end points for fetching related products

app.post("/relatedproducts",async(req,res)=>{
  const {category}=req.body;
  console.log(category+" related products");
  let products = await Product.find({ category: category });
  let popularincategory = products.slice(0, 4);
  console.log("Related products fetched");
  res.send(popularincategory);
  console.log(popularincategory);
})

//creating middleware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

//creating end point for adding products in cart data
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });

  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.send("Added");
});

//creating end pont to remove product from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.send("removed");
});

//creating end point to get cart data

app.post("/getcart", fetchUser, async (req, res) => {
  console.log(req.user);

  console.log("Cart Data fetched");
  let userdata = await Users.findOne({ _id: req.user.id });

  res.json(userdata.cartData);
});

app.listen(port, (err) => {
  if (!err) {
    console.log("server running on port " + port);
  } else {
    console.log("Error :" + err);
  }
});
