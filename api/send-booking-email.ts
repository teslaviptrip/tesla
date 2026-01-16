import { Resend } from 'resend';

// Booking email handler with security features
const resend = new Resend(process.env.RESEND_API_KEY || 're_Cmf2uRXx_6zyqGA1DBx1kAPUzx8z1Zc7a');

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 requests per 15 minutes per IP

// Security: Sanitize HTML to prevent XSS
function sanitizeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Security: Validate email format
function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Security: Validate phone format
function isValidPhone(phone: string): boolean {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 7 && phone.length <= 20;
}

// Security: Rate limiting check
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Security: Validate and sanitize input data
function validateBookingData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.customerEmail || !isValidEmail(data.customerEmail)) {
    errors.push('Invalid customer email');
  }

  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim().length < 2 || data.customerName.length > 100) {
    errors.push('Invalid customer name');
  }

  if (!data.bookingData) {
    errors.push('Missing booking data');
  } else {
    const booking = data.bookingData;
    
    if (!booking.name || typeof booking.name !== 'string' || booking.name.trim().length < 2 || booking.name.length > 100) {
      errors.push('Invalid name in booking data');
    }

    if (!booking.email || !isValidEmail(booking.email)) {
      errors.push('Invalid email in booking data');
    }

    if (!booking.phone || !isValidPhone(booking.phone)) {
      errors.push('Invalid phone in booking data');
    }

    if (!booking.pickupLocation || typeof booking.pickupLocation !== 'string' || booking.pickupLocation.trim().length < 3 || booking.pickupLocation.length > 200) {
      errors.push('Invalid pickup location');
    }

    if (!booking.destination || typeof booking.destination !== 'string' || booking.destination.trim().length < 3 || booking.destination.length > 200) {
      errors.push('Invalid destination');
    }
  }

  return { valid: errors.length === 0, errors };
}

// Booking email handler with security
export default async function handler(req: any, res: any) {
  // Security: Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Security: Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Security: Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown';
  
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    // Security: Validate Content-Type
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ error: 'Invalid content type' });
    }

    const { 
      customerEmail, 
      customerName, 
      language,
      bookingData,
      confirmationEmail 
    } = req.body;

    // Security: Validate all required fields
    const validation = validateBookingData({ customerEmail, customerName, bookingData });
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }

    // Security: Sanitize all user inputs
    const sanitizedCustomerName = sanitizeHtml(customerName.trim());
    const sanitizedCustomerEmail = customerEmail.trim().toLowerCase();
    const sanitizedBookingData = {
      ...bookingData,
      name: sanitizeHtml(bookingData.name.trim()),
      email: bookingData.email.trim().toLowerCase(),
      phone: sanitizeHtml(bookingData.phone.trim()),
      pickupLocation: sanitizeHtml(bookingData.pickupLocation.trim()),
      destination: sanitizeHtml(bookingData.destination.trim()),
      date: sanitizeHtml(bookingData.date || ''),
      time: sanitizeHtml(bookingData.time || ''),
      passengers: sanitizeHtml(bookingData.passengers || '1'),
      message: sanitizeHtml((bookingData.message || '').trim()),
      service: sanitizeHtml(bookingData.service || ''),
      serviceOption: sanitizeHtml(bookingData.serviceOption || ''),
    };

    const adminEmails = ['teslaservis149@gmail.com', 'teslaviptrip@gmail.com'];

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Tesla VIP Trip <onboarding@resend.dev>',
      to: sanitizedCustomerEmail,
      subject: confirmationEmail?.subject || 'Booking Confirmation',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #fbbf24;">${confirmationEmail?.greeting || 'Hello'} ${sanitizedCustomerName},</h2>
              <h3 style="color: #1f2937;">${confirmationEmail?.thankYou || 'Thank you for your booking request'}</h3>
              <p>${confirmationEmail?.message || 'We have received your booking request and will contact you shortly.'}</p>
              <p><strong>${confirmationEmail?.nextSteps || 'Next Steps:'}</strong></p>
              <ul>
                <li>Our team will review your booking request</li>
                <li>We'll contact you within 15 minutes to confirm details</li>
                <li>You'll receive a final confirmation email</li>
              </ul>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 14px;">${confirmationEmail?.footer || 'Best regards, Tesla VIP Trip Team'}</p>
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
        <h3>${sanitizedBookingData.bookingDetails || 'Booking Details'}</h3>
        <p><strong>${sanitizedBookingData.service || 'Service'}:</strong> ${sanitizedBookingData.service}</p>
        ${sanitizedBookingData.serviceOption ? `<p><strong>${sanitizedBookingData.option || 'Option'}:</strong> ${sanitizedBookingData.serviceOption}</p>` : ''}
        <h4>${sanitizedBookingData.tripDetails || 'Trip Details'}:</h4>
        <ul>
          <li>${sanitizedBookingData.pickup || 'Pickup'}: ${sanitizedBookingData.pickupLocation}</li>
          <li>${sanitizedBookingData.destination || 'Destination'}: ${sanitizedBookingData.destination}</li>
          <li>${sanitizedBookingData.date || 'Date'}: ${sanitizedBookingData.date}</li>
          <li>${sanitizedBookingData.time || 'Time'}: ${sanitizedBookingData.time}</li>
          <li>${sanitizedBookingData.passengers || 'Passengers'}: ${sanitizedBookingData.passengers}</li>
        </ul>
        <h4>${sanitizedBookingData.contact || 'Contact Information'}:</h4>
        <ul>
          <li>${sanitizedBookingData.name || 'Name'}: ${sanitizedBookingData.name}</li>
          <li>${sanitizedBookingData.email || 'Email'}: ${sanitizedBookingData.email}</li>
          <li>${sanitizedBookingData.phone || 'Phone'}: ${sanitizedBookingData.phone}</li>
        </ul>
        ${sanitizedBookingData.message ? `<p><strong>${sanitizedBookingData.message || 'Message'}:</strong><br>${sanitizedBookingData.message}</p>` : ''}
        <p style="margin-top: 20px;"><em>${sanitizedBookingData.footer || 'Please contact the customer to confirm the booking.'}</em></p>
      </div>
    `;

    for (const adminEmail of adminEmails) {
      await resend.emails.send({
        from: 'Tesla VIP Trip <onboarding@resend.dev>',
        to: adminEmail,
        subject: `${sanitizedBookingData.subject || 'New Booking Request'} - ${sanitizedBookingData.name}`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #fbbf24;">${sanitizedBookingData.greeting || 'New Booking Request'}</h2>
                ${bookingDetailsHtml}
              </div>
            </body>
          </html>
        `,
      });
    }

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    // Security: Don't expose internal error details
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
Fri Jan 16 15:48:12 CET 2026
