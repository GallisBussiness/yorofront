import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendResetPasswordMail({user, url}) {
  await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: user.email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur le lien pour réinitialiser votre mot de passe : ${url}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Réinitialisation de votre mot de passe</h2>
        <p style="color: #555; font-size: 16px;">Bonjour,</p>
        <p style="color: #555; font-size: 16px;">Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Réinitialiser mon mot de passe</a>
        </div>
        <p style="color: #555; font-size: 16px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
        <p style="color: #555; font-size: 16px;">Cordialement,<br>L'équipe GallisCom</p>
      </div>
    `,
  });
}

export async function sendVerifyEmailMail({user, url}) {
  await  resend.emails.send({
    from: process.env.MAIL_FROM,
    to: user.email,
    subject: 'Vérification de votre adresse email',
    text: `Cliquez sur le lien pour vérifier votre adresse email : ${url}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Vérification de votre adresse email</h2>
        <p style="color: #555; font-size: 16px;">Bonjour,</p>
        <p style="color: #555; font-size: 16px;">Merci de vous être inscrit. Pour finaliser votre inscription, veuillez vérifier votre adresse email en cliquant sur le lien ci-dessous :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Vérifier mon adresse email</a>
        </div>
        <p style="color: #555; font-size: 16px;">Si vous n'avez pas créé de compte, veuillez ignorer cet email.</p>
        <p style="color: #555; font-size: 16px;">Cordialement,<br>L'équipe GallisCom</p>
      </div>
    `,
  });
}