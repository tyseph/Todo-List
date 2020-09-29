const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is connected...: ${PORT}`));


mongoose.connect(
        process.env.URI,
        {       
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
        },
                (err) => {
                        if (err) throw err;
                        console.log("mongoDB connected successfully");
        }
);

app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRoute.js"));
app.use("/test", require("./routes/testRouter.js"));