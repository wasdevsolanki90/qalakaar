import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  // console.log(req);
  const { fullName, email, phone, message } = req;

  if (!fullName || !email || !message) {
    return NextResponse.json({ message: "Missing required fields" });
  }
  // console.log(fullName, email, phone, message);

  try {
    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Use your email provider's SMTP settings
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });
    // console.log(transporter);

    // Email content
    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: "qalaakar.orders@gmail.com", // Destination email
      subject: `Message from ${fullName}`,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone no:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // console.log(mailOptions);

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" });
  }
};