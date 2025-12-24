
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendInvoiceEmail({ to, booking }) {
    const {
        _id,
        serviceName,
        startDate,
        endDate,
        totalCost,
        location,
    } = booking;

    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: `Invoice for your booking: ${serviceName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Booking Confirmation & Invoice</h2>
                <p>Dear Customer,</p>
                <p>Thank you for booking with Care.xyz. Here are the details of your booking:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${_id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${serviceName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Duration:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedStartDate} - ${formattedEndDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${location.address || 'N/A'}, ${location.city || ''}, ${location.district || ''}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Total Cost:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-size: 1.2em; color: green;"><strong>Tk ${totalCost}</strong></td>
                    </tr>
                </table>

                <p style="margin-top: 20px;">
                    Status: <span style="background-color: #e0f7fa; padding: 5px 10px; border-radius: 5px;">Pending</span>
                </p>

                <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
                    If you have any questions, please contact support.
                </p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 0.8em; text-align: center; color: #999;">Care.xyz - Caregiving made easy</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
