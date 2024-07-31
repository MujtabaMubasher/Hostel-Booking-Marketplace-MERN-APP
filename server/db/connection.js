const mongoose = require("mongoose");

// const db = `mongodb+srv://instagram:instagram@cluster0.i9bysta.mongodb.net/?retryWrites=true&w=majority`;
const db = `mongodb+srv://FindMyHostel:FindMyHostel@cluster0.nrq3mw8.mongodb.net/`;
// const db =
//   "mongodb+srv://admin:admin@cluster0.rzbahaf.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(e, "<=error");
  });
