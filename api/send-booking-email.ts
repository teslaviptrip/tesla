import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables
config();

// Booking email handler with security features
// Lazy initialization to avoid errors during module import in dev mode
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY || '';
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
};

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
    console.log('[API] Request received:', {
      method: req.method,
      contentType: req.headers['content-type'],
      hasBody: !!req.body
    });

    // Security: Validate Content-Type
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      console.error('[API] Invalid content type:', contentType);
      return res.status(400).json({ error: 'Invalid content type' });
    }

    const { 
      customerEmail, 
      customerName, 
      language,
      bookingData,
      confirmationEmail 
    } = req.body;

    console.log('[API] Request data:', {
      customerEmail,
      customerName,
      language,
      hasBookingData: !!bookingData,
      hasConfirmationEmail: !!confirmationEmail
    });

    // Security: Validate all required fields
    const validation = validateBookingData({ customerEmail, customerName, bookingData });
    if (!validation.valid) {
      console.error('[API] Validation failed:', validation.errors);
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

    // Get sender email from environment variable or use default
    // To use your own domain:
    // 1. Go to Resend Dashboard > Domains
    // 2. Add your domain
    // 3. Copy the 3 DKIM records from Resend
    // 4. Add them to your DNS settings (where you bought the domain or Cloudflare)
    // 5. Click Verify in Resend
    // 6. Set RESEND_FROM_EMAIL in .env: RESEND_FROM_EMAIL="Tesla VIP Trip <info@yourdomain.com>"
    let fromEmail = process.env.RESEND_FROM_EMAIL || 'Tesla VIP Trip <onboarding@resend.dev>';
    
    // Validate from email - Gmail addresses are not supported by Resend
    // If RESEND_FROM_EMAIL contains Gmail, fall back to onboarding@resend.dev
    if (fromEmail.includes('@gmail.com') || fromEmail.includes('@googlemail.com')) {
      console.warn('[API] Warning: Gmail address detected in RESEND_FROM_EMAIL, using onboarding@resend.dev instead');
      fromEmail = 'Tesla VIP Trip <onboarding@resend.dev>';
    }
    
    console.log('[API] Email configuration:', {
      fromEmail,
      hasApiKey: !!process.env.RESEND_API_KEY,
      customerEmail: sanitizedCustomerEmail,
      adminEmails
    });

    // Send confirmation email to customer
    const resend = getResend();
    console.log('[API] Sending confirmation email to customer:', sanitizedCustomerEmail);
    console.log('[API] Using from email:', fromEmail);
    
    let customerEmailResult;
    try {
      console.log('[API] Attempting to send customer email with params:', {
        from: fromEmail,
        to: sanitizedCustomerEmail,
        subject: confirmationEmail?.subject || 'Booking Confirmation'
      });
      
      customerEmailResult = await resend.emails.send({
        from: fromEmail,
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
      
      console.log('[API] Customer email Resend response type:', typeof customerEmailResult);
      console.log('[API] Customer email Resend response:', JSON.stringify(customerEmailResult, null, 2));
      console.log('[API] Customer email Resend response keys:', customerEmailResult ? Object.keys(customerEmailResult) : 'null/undefined');
      
      // Check if response has error structure (error must exist and not be null)
      if (customerEmailResult && 'error' in customerEmailResult && customerEmailResult.error !== null && customerEmailResult.error !== undefined) {
        console.error('[API] Resend returned error in response:', customerEmailResult.error);
        throw new Error(`Resend API error: ${JSON.stringify(customerEmailResult.error)}`);
      }
      
      // Resend API returns { data: { id: "..." }, error: null }
      const emailId = customerEmailResult?.data?.id || customerEmailResult?.id;
      
      if (!customerEmailResult || !emailId) {
        console.error('[API] Customer email response missing ID. Full response:', customerEmailResult);
        console.error('[API] Response structure:', {
          hasResult: !!customerEmailResult,
          isObject: typeof customerEmailResult === 'object',
          keys: customerEmailResult ? Object.keys(customerEmailResult) : [],
          hasData: !!customerEmailResult?.data,
          dataKeys: customerEmailResult?.data ? Object.keys(customerEmailResult.data) : [],
          value: customerEmailResult
        });
        throw new Error(`Resend API returned invalid response - missing email ID. Response: ${JSON.stringify(customerEmailResult)}`);
      }
      
      console.log('[API] Customer email sent successfully:', {
        id: emailId,
        to: sanitizedCustomerEmail,
        from: fromEmail
      });
    } catch (emailError: any) {
      console.error('[API] Error sending customer email:', emailError);
      console.error('[API] Customer email error details:', {
        message: emailError.message,
        name: emailError.name,
        response: emailError.response?.data,
        status: emailError.response?.status,
        error: emailError.error,
        fullError: JSON.stringify(emailError, Object.getOwnPropertyNames(emailError), 2)
      });
      throw emailError; // Re-throw to be caught by outer catch
    }

    // Send booking notification to admin emails
    const bookingDetailsHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h3>${sanitizedBookingData.bookingDetails || 'Booking Details'}</h3>
        <p><strong>${sanitizedBookingData.serviceLabel || 'Service'}:</strong> ${sanitizedBookingData.service}</p>
        ${sanitizedBookingData.serviceOption ? `<p><strong>${sanitizedBookingData.optionLabel || 'Option'}:</strong> ${sanitizedBookingData.serviceOption}</p>` : ''}
        <h4>${sanitizedBookingData.tripDetails || 'Trip Details'}:</h4>
        <ul>
          <li>${sanitizedBookingData.pickupLabel || 'Pickup'}: ${sanitizedBookingData.pickupLocation}</li>
          <li>${sanitizedBookingData.destinationLabel || 'Destination'}: ${sanitizedBookingData.destination}</li>
          <li>${sanitizedBookingData.dateLabel || 'Date'}: ${sanitizedBookingData.date}</li>
          <li>${sanitizedBookingData.timeLabel || 'Time'}: ${sanitizedBookingData.time}</li>
          <li>${sanitizedBookingData.passengersLabel || 'Passengers'}: ${sanitizedBookingData.passengers}</li>
        </ul>
        <h4>${sanitizedBookingData.contact || 'Contact Information'}:</h4>
        <ul>
          <li>${sanitizedBookingData.nameLabel || 'Name'}: ${sanitizedBookingData.name}</li>
          <li>${sanitizedBookingData.emailLabel || 'Email'}: ${sanitizedBookingData.email}</li>
          <li>${sanitizedBookingData.phoneLabel || 'Phone'}: ${sanitizedBookingData.phone}</li>
        </ul>
        ${sanitizedBookingData.message ? `<p><strong>${sanitizedBookingData.messageLabel || 'Message'}:</strong><br>${sanitizedBookingData.message}</p>` : ''}
        <p style="margin-top: 20px;"><em>${sanitizedBookingData.footer || 'Please contact the customer to confirm the booking.'}</em></p>
      </div>
    `;

    // Send admin emails with delay to avoid rate limiting (Resend allows 2 requests per second)
    for (let i = 0; i < adminEmails.length; i++) {
      const adminEmail = adminEmails[i];
      
      // Add delay between admin emails (500ms = 0.5 seconds between requests)
      if (i > 0) {
        console.log('[API] Waiting 500ms before sending next admin email to avoid rate limit...');
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log('[API] Sending notification email to admin:', adminEmail);
      try {
        console.log('[API] Attempting to send admin email with params:', {
          from: fromEmail,
          to: adminEmail,
          subject: `${sanitizedBookingData.subject || 'New Booking Request'} - ${sanitizedBookingData.name}`
        });
        
        let adminEmailResult;
        let retryCount = 0;
        const maxRetries = 2;
        
        // Retry logic for rate limit errors
        // Resend doesn't throw exceptions, it returns { data: null, error: {...} } for rate limits
        while (retryCount <= maxRetries) {
          adminEmailResult = await resend.emails.send({
            from: fromEmail,
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
          
          // Check if response has rate limit error
          const isRateLimit = adminEmailResult?.error?.statusCode === 429;
          
          if (isRateLimit && retryCount < maxRetries) {
            retryCount++;
            const retryAfter = parseInt(adminEmailResult?.headers?.['retry-after'] || '1');
            const delayMs = (retryAfter + 0.5) * 1000; // Add 0.5s buffer
            console.warn(`[API] Rate limit hit for admin email to ${adminEmail}. Retrying after ${retryAfter}s (attempt ${retryCount}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            continue; // Retry
          } else {
            // No rate limit error or max retries reached - break out of retry loop
            break;
          }
        }
        
        console.log('[API] Admin email Resend response type:', typeof adminEmailResult);
        console.log('[API] Admin email Resend response:', JSON.stringify(adminEmailResult, null, 2));
        console.log('[API] Admin email Resend response keys:', adminEmailResult ? Object.keys(adminEmailResult) : 'null/undefined');
        
        // Check if response has error structure (error must exist and not be null)
        if (adminEmailResult && 'error' in adminEmailResult && adminEmailResult.error !== null && adminEmailResult.error !== undefined) {
          console.error('[API] Resend returned error in response:', adminEmailResult.error);
          // Don't throw - just log, continue with other emails
          console.warn('[API] Admin email failed but continuing with customer email success');
        }
        
        // Resend API returns { data: { id: "..." }, error: null }
        const adminEmailId = adminEmailResult?.data?.id || adminEmailResult?.id;
        
        if (!adminEmailResult || !adminEmailId) {
          console.error('[API] Admin email response missing ID. Full response:', adminEmailResult);
          console.error('[API] Response structure:', {
            hasResult: !!adminEmailResult,
            isObject: typeof adminEmailResult === 'object',
            keys: adminEmailResult ? Object.keys(adminEmailResult) : [],
            hasData: !!adminEmailResult?.data,
            dataKeys: adminEmailResult?.data ? Object.keys(adminEmailResult.data) : [],
            value: adminEmailResult
          });
          // Don't throw - just log warning, customer email was successful
          console.warn('[API] Admin email failed but customer email was successful - continuing');
        } else {
          console.log('[API] Admin email sent successfully:', {
            id: adminEmailId,
            to: adminEmail,
            from: fromEmail
          });
        }
      } catch (emailError: any) {
        console.error('[API] Error sending admin email to', adminEmail, ':', emailError);
        console.error('[API] Admin email error details:', {
          message: emailError.message,
          response: emailError.response?.data,
          status: emailError.response?.status
        });
        // Don't throw - just log warning, customer email was successful
        // Continue with other admin emails
        console.warn('[API] Admin email failed but customer email was successful - continuing with next admin email');
      }
    }

    console.log('[API] All emails sent successfully');
    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error: any) {
    console.error('[API] Error sending email:', error);
    console.error('[API] Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
      name: error.name
    });
    
    // Log Resend-specific errors
    if (error.response) {
      console.error('[API] Resend API response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    
    // Log full error details for debugging
    const errorDetails: any = {
      message: error.message || 'Unknown error',
      name: error.name,
      stack: error.stack
    };
    
    if (error.response) {
      errorDetails.resendStatus = error.response.status;
      errorDetails.resendStatusText = error.response.statusText;
      errorDetails.resendData = error.response.data;
    }
    
    // Also check for Resend SDK specific error format
    if (error.error) {
      errorDetails.resendError = error.error;
    }
    
    console.error('[API] Full error object:', JSON.stringify(errorDetails, null, 2));
    
    // Security: Don't expose internal error details in production
    // But in development, show full error details for debugging
    let errorMessage = 'Failed to send email. Please try again later.';
    
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' || process.env.VERCEL === '1') {
      // On Vercel, always show detailed errors for debugging
      errorMessage = `Email sending failed: ${errorDetails.message}`;
      
      if (errorDetails.resendData) {
        errorMessage += ` - Resend API: ${JSON.stringify(errorDetails.resendData)}`;
      } else if (errorDetails.resendStatus) {
        errorMessage += ` - Resend status: ${errorDetails.resendStatus} ${errorDetails.resendStatusText}`;
      }
      
      if (errorDetails.resendError) {
        errorMessage += ` - Resend error: ${JSON.stringify(errorDetails.resendError)}`;
      }
    }
    
    console.error('[API] Final error response:', errorMessage);
    return res.status(500).json({ 
      error: errorMessage,
      // Include details in development/Vercel
      ...(process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' || process.env.VERCEL === '1' ? { details: errorDetails } : {})
    });
  }
}
