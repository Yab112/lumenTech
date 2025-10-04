
const sendEmail = async (formData: {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  budget: string;
  projectDetails: string;
}) => {
  try {
    const response = await fetch("https://hari-backend-latest.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return response.status;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;