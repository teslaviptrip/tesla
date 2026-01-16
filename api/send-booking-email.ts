import { Resend } from 'resend';

const resend = new Resend('re_Cmf2uRXx_6zyqGA1DBx1kAPUzx8z1Zc7a');

// Booking email handler

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
        <h3>${bookingData.bookingDetails}</h3>
        <p><strong>${bookingData.service}:</strong> ${bookingData.service}</p>
        <p><strong>${bookingData.option}:</strong> ${bookingData.option || bookingData.optional}</p>
        <h4>${bookingData.tripDetails}:</h4>
        <ul>
          <li>${bookingData.pickup}: ${bookingData.pickupLocation}</li>
          <li>${bookingData.destination}: ${bookingData.destination}</li>
          <li>${bookingData.date}: ${bookingData.date}</li>
          <li>${bookingData.time}: ${bookingData.time}</li>
          <li>${bookingData.passengers}: ${bookingData.passengers}</li>
        </ul>
        <h4>${bookingData.contact}:</h4>
        <ul>
          <li>${bookingData.name}: ${bookingData.name}</li>
          <li>${bookingData.email}: ${bookingData.email}</li>
          <li>${bookingData.phone}: ${bookingData.phone}</li>
        </ul>
        <p><strong>${bookingData.message}:</strong><br>${bookingData.message || bookingData.optional}</p>
        <p style="margin-top: 20px;"><em>${bookingData.footer}</em></p>
      </div>
    `;

    for (const adminEmail of adminEmails) {
      await resend.emails.send({
        from: 'Tesla VIP Trip <onboarding@resend.dev>',
        to: adminEmail,
        subject: `${bookingData.subject} - ${bookingData.name}`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #fbbf24;">${bookingData.greeting}</h2>
                ${bookingDetailsHtml}
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
