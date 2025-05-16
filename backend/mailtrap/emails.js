import {mailtrapClient, sender} from "./mailtrap.config.js";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
} from "./emailTemplates.js";

export const sendVerificationEmail = async(email,verificationToken) => {
    const receipt = [{email}]

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:receipt,
            subject:"Verification Email Verification",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        })
        console.log("Email Sent Successfully",response)
    }catch (error){
        console.error(`Error in Sending verficaition:${error}`);

        throw new Error(`Erorr sending verification email:${error}`);

    }
}
export const sendWelcomeEmail = async (email,name)=> {
    const receipt = [{email}];
    try{
       const response =  await mailtrapClient.send({
            from:sender,
            to:receipt,
            template_uuid:"fcf9965d-c41e-450e-b8b4-9ff271e9d588",
            template_variables:{
                "company_info_name": "Auth Tutorial",
                "name": name,
            }
        })
        console.log("Email send successfully welcome",response)
    }catch (error){
        console.error(`Error in Sending verification email`,error);
        throw new Error(`Erorr sending verification email:${error}`);

    }
}
export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email send successfuly", response)

    }catch (error){
        console.error(`Error sending password reset success email:${error}`);
        throw new Error(`Error sending password reset success email:${error}`);

    }

}