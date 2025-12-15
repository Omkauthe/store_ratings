const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("../app");

exports.register = async (request,response) => {
    const { name, email, password, address } = request.body;
    const hash = await bcrypt.hash(password, 10);

    db.query(
        "insert into users (name,email,password,address,role) values (?,?,?,?,?)",[name, email, hash, address,"user"], () => 
            response.json({message: "User registered"})
    );
};

exports.login = (request,response) => {
    const { email,password } = request.body;

    db.query(
        "select * from users where email=?",
        [email],
        async(err,result) => {
            if(!result.length) return response.status(400).json({message: "Invalied"});

            const user = result[0];
            const match = await bcrypt.compare(password, user.password);
            if(!match) return response.status(401).json({message: "Invalied"});

            const token = jwt.sign(
                { id: user.id,role: user.role },
                process.env.JWT_SECRET
            );


            response.json({ token, role: user.role});
        }
    );
};