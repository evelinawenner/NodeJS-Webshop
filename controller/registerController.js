const User = require("../models/user");
const bcrypt = require("bcrypt");

//render?

const registerSubmit = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash( password, salt);

        await new User({
            name: name,
            email: email,
            password: hashedPassword
        }).save();
        return res.send("Kontot registrerat!");
    }
    catch(err) {
        if(err) return res.send({ err:err });
    }
}

module.exports = {
    registerSubmit
}