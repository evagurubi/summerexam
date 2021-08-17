const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./server");
const port = 5000;

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB NOT connected ", err));

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
