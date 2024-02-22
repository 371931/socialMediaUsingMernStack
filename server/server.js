import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/auth.js";
import postRouter from "./Routes/posts.js";
import commentRoute from "./Routes/comments.js";
import likesRouter from "./Routes/likes.js";
import usersRoute from "./Routes/user.js"
import follwersRoute from "./Routes/follwers.js";
import env from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = Express();
env.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(Express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../app/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post("/post/upload",upload.single("file"),(req,res)=>{
    let file = req.file;
    res.status(200).json(file.filename);
});


app.use("/auth", router);
app.use("/post", postRouter);
app.use("/comment", commentRoute);
app.use("/likes", likesRouter);
app.use("/userInfo", usersRoute);
app.use("/follwers",follwersRoute);

app.listen(3001,(err)=>{
    err && console.log(err);
});
