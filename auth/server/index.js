import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import passportSession from 'passport-session';
import { Strategy } from 'passport-local';
import cors from 'cors';


dotenv.config();
const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true               // Allow cookies
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,  // recommended for security
        secure: false,   // must be false on localhost (true only with HTTPS)
        sameSite: 'lax'
    }
}));
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

app.post("/signup", async (req, res) => {
    const { name, password, contact } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [name]);
        if (result.rows.length > 0) {
            res.json({message: "User already exists", user: req.session.user});
        }
        else {
            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const insertResult = await db.query('INSERT INTO users(email, password, mobile_no, role) VALUES($1, $2, $3, $4) RETURNING *',
                    [name, hashedPassword, contact, "user"]);
                const newUser = insertResult.rows[0];
                req.session.user = {
                    id: newUser.id,
                    email: newUser.email,
                    mobile_no: newUser.mobile_no
                };
                req.session.save(err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({message: "Error saving session"});
                    }
                    res.json({ message: "User signed in successfully", user: req.session.user });
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({message: "Error in Signup", user: null});   
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error in signup", user: null});
    }
})

app.post('/signin', async (req, res) => {
    const { name, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [name]);
        if (result.rows.length == 0) {
            res.json({message: "User doesn't exist", user: null});
        }
        else {
            bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({message: "Error comparing password"});
                }
                if (!isMatch) {
                    return res.status(401).json({message: "Invalid password", user: null});
                }
                req.session.user = {
                    id: result.rows[0].id,
                    email: result.rows[0].email,
                    mobile_no: result.rows[0].mobile_no
                };
                req.session.save(err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({message: "Error saving session"});
                    }
                    res.json({ message: "User signed in successfully", user: req.session.user });
                });
            });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error in signin"});
    } 
})

app.get("/checkAuth", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})