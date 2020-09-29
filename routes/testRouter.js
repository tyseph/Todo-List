const router = require("express").Router();
const auth = require("../middleware/auth");
const Test = require("../models/testModel");

router.post("/", async (req, res) => {
        try {
                const {title} = req.body;

                if (!title)
                        return res.status(400).json({msg: "Not all fieldsfilled"});

                const newTest = new test({
                        title
                });

                const savedTodo = await newTest.save();
                res.json(savedTodo);

        } catch (err) {
                res.status(500).json({error: err.message});
        }
});

module.exports = router;

