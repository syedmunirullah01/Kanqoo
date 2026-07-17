// lib/email.js - Fixed to return proper result
import { Resend } from "resend";

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set -- email sending disabled.");
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(email, fullName, token) {
  const resend = getResendClient();
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com", // Update with your domain
      to: email,
      subject: "Verify your Kanqoo account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${fullName || ''},</h2>
          <p>Thank you for signing up for Kanqoo! To complete your registration, please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="background-color: #4BA4B4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Verify Email
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; font-family: monospace; background: #f5f5f5; padding: 8px; border-radius: 4px;">${verificationUrl}</p>
          <p>This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.</p>
          <p>Best regards,<br>The Kanqoo Team</p>
        </div>
      `,
    });

    if (result.data) {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to send email' };
    }
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email, fullName, token) {
  const resend = getResendClient();
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com",
      to: email,
      subject: "Reset your Kanqoo password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${fullName || ''},</h2>
          <p>We received a request to reset your Kanqoo password. Click the button below to reset it:</p>
          <a href="${resetUrl}" style="background-color: #4BA4B4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>This link expires in 1 hour.</p>
          <p>Best regards,<br>The Kanqoo Team</p>
        </div>
      `,
    });

    return result.data ? { success: true } : { success: false, error: 'Failed to send email' };
  } catch (error) {
    console.error("sendPasswordResetEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

/**
 * Send welcome email after verification
 */
export async function sendWelcomeEmail(email, fullName) {
  const resend = getResendClient();

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com",
      to: email,
      subject: "Welcome to Kanqoo! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome aboard, ${fullName || ''}!</h2>
          <p>Thanks for joining Kanqoo. You're now ready to start building your influencer network.</p>
          <p><strong>Next Steps:</strong></p>
          <ul style="text-align: left;">
            <li>Complete your profile</li>
            <li>Connect your affiliate networks</li>
            <li>Start recruiting publishers</li>
          </ul>
          <p>If you need help, our support team is here for you.</p>
          <p>Best regards,<br>The Kanqoo Team</p>
        </div>
      `,
    });

    return result.data ? { success: true } : { success: false, error: 'Failed to send email' };
  } catch (error) {
    console.error("sendWelcomeEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

/**
 * Send account suspension email
 */
export async function sendSuspensionEmail(email, fullName, context = {}) {
  const resend = getResendClient();

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  const { reason = 'Policy violation or suspicious activity', supportEmail = 'support@kanqoo.com' } = context;

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com",
      to: email,
      subject: "Your Kanqoo account has been suspended",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${fullName || ''},</h2>
          <p>We wanted to let you know that your Kanqoo account has been <strong>temporarily suspended</strong>.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>If you believe this suspension is a mistake or would like more information, please reach out to our support team.</p>
          <p>You can contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>. We’re happy to review your case and work with you on next steps.</p>
          <p>Best regards,<br>The Kanqoo Compliance Team</p>
        </div>
      `,
    });

    return result.data ? { success: true } : { success: false, error: 'Failed to send email' };
  } catch (error) {
    console.error("sendSuspensionEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

/**
 * Send publisher status update email (approved, pending, declined)
 */
export async function sendPublisherStatusEmail(email, fullName, status) {
  const resend = getResendClient();

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'https://kanqoo.com';
  const nameSegment = fullName ? `, ${fullName}` : '';

  const statusConfig = {
    approved: {
      subject: 'Your Kanqoo account has been approved',
      heading: 'You are approved!',
      highlight: 'Approved',
      message: `
        <p>Congratulations${nameSegment}! Your Kanqoo publisher account has been <strong>approved</strong>.</p>
        <p>You can now access your dashboard, create tracking links, and start earning.</p>
        <p><a href="${baseUrl}/publisher" style="display:inline-block;padding:12px 24px;background-color:#4BA4B4;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">Go to Dashboard</a></p>
      `,
    },
    pending: {
      subject: 'Your Kanqoo account is under review',
      heading: 'We are reviewing your account',
      highlight: 'Pending',
      message: `
        <p>Hello${nameSegment}. Your Kanqoo publisher account status is currently <strong>pending</strong>.</p>
        <p>Our compliance team is reviewing your application. We will notify you as soon as the review is complete.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
      `,
    },
    declined: {
      subject: 'Your Kanqoo application update',
      heading: 'Application declined',
      highlight: 'Declined',
      message: `
        <p>Hello${nameSegment}. After reviewing your Kanqoo publisher application, we are unable to approve it at this time.</p>
        <p>If you believe this decision was made in error or would like to provide additional information, please reach out to our support team.</p>
        <p><a href="mailto:support@kanqoo.com" style="color:#4BA4B4;font-weight:bold;">Contact support</a></p>
      `,
    },
  };

  const config = statusConfig[status];
  if (!config) {
    return { success: false, error: `Unsupported status: ${status}` };
  }

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com",
      to: email,
      subject: config.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color:#1f2937;">
          <h2 style="color:#111827;">${config.heading}</h2>
          <p style="text-transform:uppercase;font-size:12px;letter-spacing:1px;color:#4BA4B4;margin-bottom:16px;">Status: ${config.highlight}</p>
          ${config.message}
          <p style="margin-top:24px;">Best regards,<br/>The Kanqoo Team</p>
        </div>
      `,
    });

    return result.data ? { success: true } : { success: false, error: 'Failed to send email' };
  } catch (error) {
    console.error("sendPublisherStatusEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

/**
 * Send team invite email
 */
export async function sendTeamInviteEmail(email, fullName, role, inviteLink) {
  const resend = getResendClient();

  if (!resend) {
    return { success: false, error: 'Email service unavailable' };
  }

  const safeLink = inviteLink || `${process.env.NEXTAUTH_URL}/accept-invite`;
  const displayName = fullName || 'there';
  const roleLabel = role ? role.replace(/\b\w/g, (char) => char.toUpperCase()) : 'team member';

  try {
    const result = await resend.emails.send({
      from: "no-reply@kanqoo.com",
      to: email,
      subject: `You're invited to Kanqoo as a ${roleLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color:#1f2937;">
          <h2 style="color:#111827;">Welcome to Kanqoo</h2>
          <p>Hello ${displayName},</p>
          <p>You have been invited to join the Kanqoo admin workspace as a <strong>${roleLabel}</strong>.</p>
          <p>To get started, please accept the invitation and set your password by clicking the button below:</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${safeLink}" style="display:inline-block;padding:12px 24px;background-color:#4BA4B4;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">
              Accept Invitation
            </a>
          </p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-family: monospace;">${safeLink}</p>
          <p>This invitation will expire in 7 days. If you did not expect this email, you can safely ignore it.</p>
          <p style="margin-top:24px;">Best regards,<br/>The Kanqoo Team</p>
        </div>
      `,
    });

    return result.data ? { success: true } : { success: false, error: 'Failed to send invite email' };
  } catch (error) {
    console.error("sendTeamInviteEmail error:", error);
    return { success: false, error: error.message || 'Email sending failed' };
  }
}

