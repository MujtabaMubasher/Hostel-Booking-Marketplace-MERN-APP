const express = require("express");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcrypt");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fetch = require("node-fetch");
const stripe = require('stripe')('');

const app = express();

// Import Schemas
const Users = require("./models/userSchema");
const Post = require("./models/postSchema");
const Hostel = require("./models/hostelSchema");
// const Contacts = require('./models/contactSchema');

// connect to db
require("./db/connection");

// Import Middlewares
const authenticate = require("./middleware/auth");
const { default: axios } = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8000;

async function geocodeAddress(address) {
  const encodedAddress = encodeURIComponent(address);
  const geocodeUrl = ``;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      // Handle geocoding errors
      console.error('Geocoding failed: Address not found');
      return null;
    }
  } catch (error) {
    // Handle API request errors
    console.error('Error fetching geocoding data: ', error);
    return null;
  }
}

const calculateOrderAmount = (months, price) => {
  switch (months) {
    case 1:
      return price * 1;
    case 2:
      return price * 2;
    case 3:
      return price * 3;
    case 4:
      return price * 4;
    case 5:
      return price * 5;
    case 6:
      return price * 5.5;
    case 7:
      return price * 6.5;
    case 8:
      return price * 7.5;
    case 9:
      return price * 8.5;
    case 10:
      return price * 9;
    case 11:
      return price * 9.5;
    case 12:
      return price * 10;
  }
};


app.post("/api/create-payment-intent", async (req, res) => {
  const { price, months } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: months * price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/api/register", async (req, res, next) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
      res.status(400).send("Cannot be empty");
    }

    const isExist = await Users.findOne({ $or: [{ email }, { username }] });
    if (isExist) {
      res.status(400).send("User already exist");
    } else {
      const user = new Users({
        username,
        email,
        userType,
      });
      bcryptjs.hash(password, 10, async (err, hashedPassword) => {
        if (err) next(err);
        await user.set("password", hashedPassword);
        await user.save();
        return res.status(200).send("Successfully Registered");
      });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error, "error");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400).send("Cannot be empty");
  }
  const user = await Users.findOne({ $or: [{ email }, { username: email }] });
  if (!user) {
    res.status(402).send("User or password is invalid");
  } else {
    const validate = await bcryptjs.compare(password, user.password);
    if (!validate) {
      res.status(401).send("User or password is invalid");
    } else {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const JWT_SECRET_KEY =
        process.env.JWT_SECRET_KEY || "THIS_IS_THE_SECRET_KEY_OF_JWT";
      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn: 86400 },
        async (err, token) => {
          if (err) res.json({ message: err });
          await Users.updateOne(
            { _id: user._id },
            {
              $set: { token },
            }
          );
          user.save();
          return res.status(200).json({ user, token });
        }
      );
    }
  }
});

app.post("/api/verify-hostel", authenticate, async (req, res) => {
  try {
    // const { caption, desc, url } = req.body;
    const { user } = req;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Please fill all the fields");
    }
    const isAlreadySubmitted = await Post.findOne({ user: user._id });
    if (isAlreadySubmitted) {
      res.status(400).send("Already Submitted");
    }
    const createPost = new Post({
      ...req.body,
      user: user._id,
    });
    await createPost.save();
    res.status(200).send("Request Submit Successfully");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/verify-status", authenticate, async (req, res) => {
  try {
    const { user } = req;
    const post = await Post.findOne({ user: user._id });
    if (!post) {
      return res.status(200).json({ status: "not found" });
    }
    if (post.confirmed) {
      return res.status(200).json({ status: "verified" });
    }
    return res.status(200).json({ status: "not-verified" });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.post("/api/add-hostel", authenticate, async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Please fill all the fields");
    }
    const { user } = req;
    const { hostelAddress } = req.body;
    const location = await geocodeAddress(hostelAddress);
    const hostel = new Hostel({
      ...req.body,
      location,
      user: user._id,
    });
    await hostel.save();
    res.status(200).send("Hostel Added Successfully");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/requests", authenticate, async (req, res) => {
  try {
    const requests = await Post.find();
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});
app.get("/api/counts", authenticate, async (req, res) => {
  try {
    const ownersCount = await Post.countDocuments();
    const UsersCount = await Users.countDocuments();
    const HostelsCount = await Hostel.countDocuments();

    res.status(200).json({ ownersCount, UsersCount, HostelsCount });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});
app.get("/api/request/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await Post.findOne({ _id: id });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.put("/api/requests/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      res.status(400).send("Request not found");
    }
    post.set("confirmed", true);
    await post.save();
    res.status(200).send("Request Confirmed");
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json({ hostels });
  } catch (error) {}
});
app.get("/api/hostels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findOne({ _id: id });
    res.status(200).json({ hostel });
  } catch (error) {
    res.status(500).send("Error" + error);
  }
});

app.get("/api/hostels/search", async (req, res) => {
  const { hostelName, city, country, type } = req.query;
  const filter = {};
  if (hostelName) filter.hostelName = { $regex: hostelName, $options: "i" };
  if (city) filter.city = { $regex: city, $options: "i" };
  if (country) filter.country = { $regex: country, $options: "i" };
  if (type) filter.type = { $regex: type, $options: "i" };
  try {
    const hostels = await Hostel.find(filter);
    res.json(hostels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => process.exit(1));
});


app.listen(port, () => {
  console.log("Server is running");
});
