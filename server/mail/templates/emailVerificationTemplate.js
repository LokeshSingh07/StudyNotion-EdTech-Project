const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const otpTemplate = (otp) => {
  const safeOtp = escapeHtml(otp);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Verify your StudyNotion email</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .page { background-color: #0b1220 !important; }
      .card { background-color: #111827 !important; border-color: #1f2937 !important; }
      .heading, .highlight-text { color: #f9fafb !important; }
      .text, .subtext { color: #e5e7eb !important; }
      .muted { color: #9ca3af !important; }
      .header-link { color: #94a3b8 !important; }
      .info-box { background-color: #0b1220 !important; border-color: #1f2937 !important; }
      .accent-text { color: #FFD60A !important; }
    }
    @media only screen and (max-width: 620px) {
      .card { padding: 28px 20px !important; }
      .otp-code { font-size: 28px !important; letter-spacing: 6px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your StudyNotion verification code is ${safeOtp}. It expires in 5 minutes.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="page" style="background-color:#f8fafc;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">

          <!-- Header: small logo + name, left aligned -->
          <tr>
            <td align="left" style="padding-bottom:16px;">
              <a href="https://studynotion-edtech.vercel.app" target="_blank" style="text-decoration:none;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle" style="padding-right:8px;">
                      <img src="https://res.cloudinary.com/dcyjap6ft/image/upload/v1768821164/extra/CWL%20logo.png" alt="StudyNotion" width="28" style="display:block;border:0;width:28px;height:auto;">
                    </td>
                    <td valign="middle" class="brand" style="font-size:16px;font-weight:700;color:#111827;letter-spacing:-0.01em;">
                      StudyNotion
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td class="card" align="center" style="background-color:#ffffff;border:1px solid #e2e8f0;border-top:4px solid #FFD60A;border-radius:12px;padding:36px 36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">

              <h1 class="heading" style="margin:0 0 12px;font-size:22px;font-weight:700;line-height:1.3;color:#111827;text-align:center;">
                Verify Your Email Address
              </h1>

              <p class="text" style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;text-align:center;">
                Thank you for joining StudyNotion. Please use the following One-Time Password (OTP) to finish creating your account.
              </p>

              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto 24px;">
                <tr>
                  <td class="info-box" align="center" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 36px;">
                    <span class="otp-code accent-text" style="font-family:'Courier New',Courier,monospace;font-size:34px;font-weight:700;letter-spacing:8px;color:#111827;">${safeOtp}</span>
                  </td>
                </tr>
              </table>

              <p class="subtext" style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4b5563;text-align:center;">
                This code is valid for <strong>5 minutes</strong>.
              </p>
              <p class="muted" style="margin:0;font-size:13px;line-height:1.6;color:#64748b;text-align:center;">
                Do not share this code with anyone. StudyNotion will never ask you for your OTP.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="muted" style="padding:24px 20px 0;font-size:13px;line-height:1.6;color:#64748b;">
              Didn't request this verification? You can safely ignore this email.<br>
              Need assistance? Email us at
              <a href="mailto:noreply@codewithlokesh.com" style="color:#64748b;text-decoration:underline;">noreply@codewithlokesh.com</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = otpTemplate;
module.exports.otpTemplate = otpTemplate;
module.exports.emailVerificationTemplate = otpTemplate;
