const express = require("express");
const serverless = require("serverless-http");
const nodeMailer = require("nodemailer");
const path = require("path");
const app = express();

async function main(email, subject, html) {

    const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nwankwochidera.david@gmail.com',
            pass: 'fxomfkobzpujmrcx'
        }
    });

    const info = await transport.sendMail({
        from: "A-Venture <nwankwochidera.david@gmail.com>",
        to: email,
        subject: subject,
        html: html
    });

    console.log("Message sent: " + info.messageId);

}

app.use(express.json());
app.use(express.static("dist"));

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", path.join(path.join("..", `${__dirname}`), "/dist"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/sendMail", (req, res) => {
    const { name, email, subject, message, likeToSignUp } = req.body;
    let notify = "";
    if (likeToSignUp) {
        notify = "Please, I would like to signup to london mailing list";
    } else {
        notify = "Sorry, I won't like to recieve any mail from the company"
    }
    const Mail = `
    <body>
        <h1>Name: ${name}</h1>
        <h1>Email: ${email}</h1>
        <h1>Subject: ${subject}<h1>
        <h1>Message: ${message}</h1>
        <h1>${notify} </h1>
    </body>
    `;

    main(email, subject, Mail)
        .catch(error => console.log(error));

    res.json({ msg: true });
})

module.exports.handler = serverless(app);