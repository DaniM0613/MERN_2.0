import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
   const {email, nombre, token} = datos;

   const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1751b4e7f1e574",
        pass: "c64af26d1ba61a"
      }
    });

    // Informacion del email

    const infor = await transport.sendMail({
        from: '"UpTask - Administrar de proyectos" <cuentas@uptask.com>',
        to: email, 
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: ` <p>Hola: ${nombre} Comprueba tu cuenta en UpTask </p>
        <p>Tu cuenta ya esta casi ista, solo debes comprobarla en el siguiente enlace </p>
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar Cuenta</a>
        <p>Si to no creaste esta cuenta, puedes ignorar el mensaje </p>
        
        `
    });
};