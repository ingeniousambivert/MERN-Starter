module.exports = function (app) {
	function getLink(type, hash) {
	const url = app.get("clientURL") + "/" + type + "?token=" + hash;
	return url;
	}

	function sendEmail(email) {
	return app
		.service("mailer")
		.create(email)
		.then(function (result) {
		console.log("Sent email", result);
		})
		.catch((err) => {
		console.log("Error sending email", err);
		});
	}
	const FROM_EMAIL = app.get("mailer.fromEmail");

	return {
	service: "users",
	notifier: function (type, user) {
		let tokenLink;
		let email;

		switch (type) {
		case "resendVerifySignup":
			//sending the user the verification email
			console.log("user", user);
			tokenLink = getLink("verify", user.verifyToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Verify Email",
			html: `<html><b>Verify your Email here</b>: ${tokenLink}</html>`,
			};
			return sendEmail(email);

		case "verifySignup":
			// confirming verification
			tokenLink = getLink("verify", user.verifyToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Email Verified",
			html: "<html><b>Thanks for verifying your email. Now you can access all the features</b></html>",
			};
			return sendEmail(email);

		case "sendResetPwd":
			console.log("user", user);
			tokenLink = getLink("reset-password", user.resetToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Reset Password",
			html: `<html><b>Reset Password here</b>: ${tokenLink}</html>`,
			};
			return sendEmail(email);

		case "resetPwd":
			tokenLink = getLink("reset-password", user.resetToken);
			email = email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Successfully Reset Password",
			html: "<html><b>Successfully reset password.</b></html>",
			};
			return sendEmail(email);

		case "passwordChange":
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Password Changed",
			html:
				"<html><b>Successfully updated password. If this was not you, let us know.</b></html>",
			};
			return sendEmail(email);

		case "identityChange":
			tokenLink = getLink("verify", user.verifyToken);
			console.log("user", user);
			email = {
			from: FROM_EMAIL,
			to: [user.verifyChanges.email, user.email],
			subject: "Verify New Email Address",
			html: `<html><b>Verify New Email Address here ${tokenLink}</b></html>`,
			};
			return sendEmail(email);

		default:
			break;
		}
	},
	};
};