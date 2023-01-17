import nodemailer from 'nodemailer'

const user = "saadaoui.med90@gmail.com";
const pass = "ljkipknmxwsjdipa";

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user: user,
        pass: pass,
    },
    port : 465,
    host : "smtp.gmail.com"
})


const sendConfirmationMail =async (firstName,lastName,email,password) =>{
    transport.sendMail({
        from : user,
        to : email,
        subject : 'Welcome',
        html : `
        <div>
        <h1>Login to platform</h1>
        <h2> Hi ${firstName} ${lastName}</h2>
        <p> To login to your account use the email and password below :</p>
        <ul>
        <li>Email : ${email}</li>
        <li>Password : ${password}</li>
        </ul>
        </div>
        `
    })
    .catch((err) => console.log(err))
}



const sendResetPassword = async(email,randomCode) =>{
    transport.sendMail({
        from: user,
      to: email,
      subject: "Demande reinitialisation du mot de passe  ",
      html: `
      <div>
      <h1> Réinitialisation du mot de passe </h1>
      
        <p>reinitialiser votre  mot de passe en cliquant sur le lien suivant
</p>
        <p> votre nouvelle password : ${randomCode}</p>

        </div>`,
    })
}

export {sendConfirmationMail, sendResetPassword}