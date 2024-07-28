export const otpTemplate = ({ otp }: { otp: number }) => {
  return `
   <!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome to Combuyn</title>
</head>
<body style="background-color:#f2f2f2; font-family:arial;">
<table border="0" cellpadding="0" cellspacing="0"
        style="border-collapse:separate; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; background-color:#f2f2f2;">
  <tr>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    <td class="container"  style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin:0px auto; max-width: 580px; padding: 10px;"><div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        <!-- START CENTERED WHITE CONTAINER -->
        <span class="preheader"
                        style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"></span>
        <table class="main"
                        style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
          <tr>
            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 20px;">
                <table border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;text-align: center;">
                <tr>
                  <td>
                   <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color:#220456; margin-top:15px; Margin-bottom:10px;">Your One Time Password is </p>
                    <p style="font-family: sans-serif; font-size: 40px; line-height:40px; font-weight: bold; margin-top:15px; color:#E75756; Margin-bottom:10px;">${otp}</p>
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color:#220456; margin-top:0px; Margin-bottom: 35px;">This OTP will be valid for 10 minutes </p>
                    <p style="font-family: sans-serif; font-size: 14px; line-height:22px; font-weight: normal; margin: 0; color:#25272B; Margin-bottom:25px;">If you need help, or you have any other questions, feel free to email support</p>
                    <p style="font-family: sans-serif; font-size: 14px; color:#616466; line-height:22px; font-weight: normal; margin: 0; Margin-bottom:30px;">Thanks,<br>
                      <strong>Express app</strong> </p>
                 </tr>
              </table></td>
          </tr>
        </table>
        
        <!-- END FOOTER -->
        <!-- END CENTERED WHITE CONTAINER -->
      </div></td>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
  </tr>
</table>
</body>
</html>`;
};
