const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const courseEnrollmentEmail = (courseName, name) => {
  const safeCourseName = escapeHtml(courseName);
  const safeName = escapeHtml(name);
  const greeting = safeName ? `Hey ${safeName},` : "Hello,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Course Enrollment Confirmation</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .page { background-color: #0b1220 !important; }
      .card { background-color: #111827 !important; border-color: #1f2937 !important; }
      .heading, .highlight-text { color: #f9fafb !important; }
      .text, .subtext { color: #e5e7eb !important; }
      .muted { color: #9ca3af !important; }
      .header-link { color: #94a3b8 !important; }
      .info-box { background-color: #0b1220 !important; border-color: #1f2937 !important; }
      .course-title { color: #FFD60A !important; }
      .course-badge { background-color: #1e293b !important; color: #38bdf8 !important; border-color: #334155 !important; }
    }
    @media only screen and (max-width: 620px) {
      .card { padding: 28px 20px !important; }
      .cta-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    You are successfully enrolled in ${safeCourseName}! Start learning now.
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
                Welcome to the Course!
              </h1>

              <p class="text" style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#4b5563;text-align:left;">
                ${greeting}
              </p>

              <p class="text" style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;text-align:left;">
                Congratulations on taking the next step in your learning journey! You have successfully registered for:
              </p>

              <!-- Course Info Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td class="info-box" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px 20px;text-align:left;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748b;margin-bottom:6px;">Enrolled Course</div>
                    <div class="course-title" style="font-size:17px;font-weight:700;color:#111827;line-height:1.4;">
                      ${safeCourseName}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" bgcolor="#FFD60A" style="border-radius:8px;">
                    <a href="https://studynotion-edtech.vercel.app/dashboard/enrolled-courses" target="_blank" class="cta-btn"
                       style="display:inline-block;padding:12px 32px;font-size:15px;font-weight:600;color:#000000;text-decoration:none;border-radius:8px;background-color:#FFD60A;">
                      Go to Course Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <p class="muted" style="margin:0;font-size:13px;line-height:1.6;color:#64748b;text-align:center;">
                You can start watching lectures, track your progress, and download study resources anytime.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="muted" style="padding:24px 20px 0;font-size:13px;line-height:1.6;color:#64748b;">
              Need help or have questions? Email us at
              <a href="mailto:noreply@codewithlokesh.com" style="color:#64748b;text-decoration:underline;">noreply@codewithlokesh.com</a>.<br>
              StudyNotion EdTech &bull; <a href="https://codewithlokesh.com" target="_blank" style="color:#64748b;text-decoration:none;">codewithlokesh.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = courseEnrollmentEmail;
module.exports.courseEnrollmentEmail = courseEnrollmentEmail;
