import { Resend } from 'resend';

const resend = new Resend('re_Cmf2uRXx_6zyqGA1DBx1kAPUzx8z1Zc7a');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      customerEmail, 
      customerName, 
      language,
      bookingData,
      confirmationEmail 
    } = req.body;

    const adminEmails = ['teslaservis149@gmail.com', 'teslaviptrip@gmail.com'];

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Tesla VIP Trip <onboarding@resend.dev>',
      to: customerEmail,
      subject: confirmationEmail.subject,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #fbbf24;">${confirmationEmail.greeting} ${customerName},</h2>
              <h3 style="color: #1f2937;">${confirmationEmail.thankYou}</h3>
              <p>${confirmationEmail.message}</p>
              <p><strong>${confirmationEmail.nextSteps}</strong></p>
              <ul>
                <li>Our team will review your booking request</li>
                <li>We'll contact you within 15 minutes to confirm details</li>
                <li>You'll receive a final confirmation email</li>
              </ul>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 14px;">${confirmationEmail.footer}</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                Tesla VIP Trip<br>
                Vienna - Bratislava - Budapest
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Send booking notification to admin emails
    const bookingDetailsHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h3>${ookingData.ookingDetails}</h3>
        <p><strong>${ookingData.service}:</strong> ${ookingData.service}</p>
        <p><strong>${ookingData.option}:</strong> ${ookingData.option || ookingData.optional}</p>
        <h4>${ookingData.tripDetails}:</h4>
        <ul>
          <li>${ookingData.pickup}: ${ookingData.pickupLocation}</li>
          <li>${ookingData.destination}: ${ookingData.destination}</li>
          <li>${ookingData.date}: ${ookingData.date}</li>
          <li>${ookingData.time}: ${ookingData.time}</li>
          <li>${ookingData.passengers}: ${ookingData.passengers}</li>
        </ul>
        <h4>${ookingData.contact}:</h4>
        <ul>
          <li>${ookingData.name}: ${ookingData.name}</li>
          <li>${ookingData.email}: ${ookingData.email}</li>
          <li>${ookingData.phone}: ${ookingData.phone}</li>
        </ul>
        <p><strong>${ookingData.message}:</strong><br>${ookingData.message || ookingData.optional}</p>
        <p style="margin-top: 20px;"><em>${ookingData.footer}</em></p>
      </div>
    `;

    for (const adminEmail of adminEmails) {
      await resend.emails.send({
        from: 'Tesla VIP Trip <onboarding@resend.dev>',
        to: adminEmail,
        subject: `${ookingData.subject} - ${ookingData.name}`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #fbbf24;">${ookingData.greeting}</h2>
                ${ookingDetailsHtml}
              </div>
            </body>
          </html>
        `,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
