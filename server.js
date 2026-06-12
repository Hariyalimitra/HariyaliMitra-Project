const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const supabase = require("./supabase");
const app = express();

let generatedOTP = "";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "thekaransrivastav7842@gmail.com",
        pass: "utrh gxsj zuiy odeu"
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP READY");
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/contact", (req, res) => {

    console.log("Contact Form Data:");
    console.log(req.body);

    res.send("Message Received");

});

app.get("/test-email", async (req, res) => {

    try {

        await transporter.sendMail({
            from: "thekaransrivastav7842@gmail.com",
            to: "thekaransrivastav7842@gmail.com",
            subject: "HariyaliMitra Test",
            text: "Email system working 🚀"
        });

        res.send("Email Sent Successfully");

    } catch (error) {

        console.log(error);
        res.send("Email Failed");

    }

});

app.get("/send-otp", async (req, res) => {

    const email = req.query.email;
    console.log(email);

    generatedOTP =
    Math.floor(1000 + Math.random() * 9000).toString();

    try {

        await transporter.sendMail({

            from: "thekaransrivastav7842@gmail.com",
            to: email,
            subject: "HariyaliMitra OTP",
            text: "Your OTP is: " + generatedOTP

        });

        res.send("OTP Sent");

    } catch (error) {

        console.log(error);
        res.send("OTP Failed");

    }

});

app.get("/verify-otp", (req, res) => {

    const userOTP = req.query.otp;

    if (userOTP === generatedOTP) {

        res.send("SUCCESS");

    } else {

        res.send("FAILED");

    }

});
app.get("/check-user", async (req, res) => {

    const email = req.query.email;

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

    if (error) {
        return res.send("ERROR");
    }

   if (data.length > 0) {
    res.json({
        status: "FOUND",
        fullname: data[0].fullname,
        email: data[0].email
    });
} else {
    res.json({
        status: "NOT_FOUND"
    });
}
});
app.post("/register", async (req, res) => {

    const { fullname, email } = req.body;
    const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

if (existingUser.length > 0) {
    return res.send("Email Already Registered");
}
    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                fullname: fullname,
                email: email
            }
        ]);

    if (error) {
    console.log(error);
    return res.send(error.message);
}
    res.send("Registration Successful");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`HariyaliMitra Running on Port ${PORT}`);
});