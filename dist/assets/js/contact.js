const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const likeToSignUp = document.getElementById("subscribe").checked;

    const data = {
        name, email, subject, message, likeToSignUp
    };

    const response = await fetch("/sendMail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const msg = await response.json();
    console.log(msg);
    if(msg){
        alert("Mail Successfully Sent!");
        location.assign("/");
    } else{
        alert("Sorry an error occurred!");
    }
}