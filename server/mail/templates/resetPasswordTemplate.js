const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isUrl = (v) => typeof v === "string" && /^https?:\/\//.test(v);

/**
 * Password reset email template.
 * Supports (url, name) or (email, url, name) argument orders.
 */
const resetPasswordTemplate = (arg1 = "", arg2 = "", arg3 = "") => {
  let url, name;

  if (isUrl(arg1)) {
    url = arg1;
    name = arg2;
  } else if (isUrl(arg2)) {
    url = arg2;
    name = arg3;
  } else {
    url = arg1;
    name = arg2;
  }

  const safeUrl = escapeHtml(url);
  const safeName = escapeHtml(name);
  const greeting = safeName ? `Hi ${safeName},` : "Hello,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Reset Your Password</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .page { background-color: #0b1220 !important; }
      .card { background-color: #111827 !important; border-color: #1f2937 !important; }
      .heading { color: #f9fafb !important; }
      .text { color: #e5e7eb !important; }
      .muted { color: #9ca3af !important; }
    }
    @media only screen and (max-width: 620px) {
      .card { padding: 24px 20px !important; }
      .cta-btn { display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Reset your StudyNotion password. This link is valid for 5 minutes.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="page" style="background-color:#f8fafc;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:480px;">

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

          <!-- Card -->
          <tr>
            <td class="card" style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:32px;">

              <h1 class="heading" style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111827;">
                Reset your password
              </h1>

              <p class="text" style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#4b5563;">
                ${greeting}
              </p>

              <p class="text" style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                Click the button below to choose a new password. This link is valid for <strong>5 minutes</strong>.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td bgcolor="#FFD60A" style="border-radius:8px;">
                    <a href="${safeUrl}" target="_blank" class="cta-btn"
                       style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:600;color:#000000;text-decoration:none;border-radius:8px;background-color:#FFD60A;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p class="muted" style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
                If you didn't request this, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="muted" style="padding:16px 0 0;font-size:12px;color:#94a3b8;">
              StudyNotion
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = resetPasswordTemplate;
module.exports.resetPasswordTemplate = resetPasswordTemplate;