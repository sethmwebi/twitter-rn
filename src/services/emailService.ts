import { SESClient, SendEmailCommand} from "@aws-sdk/client-ses"

const ses = new SESClient({})

function createSendEmailCommand(toAddress: string, fromAddress: string, message: string){
	return new SendEmailCommand({
		Destination: {
			ToAddresses: [toAddress]
		},
		Source: fromAddress,
		Message: {
			Body: {
				Text: {
					Charset: "UTF-8",
					Data: message
				}
			},
			Subject: {
				Charset: "UTF-8",
				Data: "Your one-time password"
			}
		}
	})
}
export async function sendEmailToken(email: string, token: string){
	const message = `Your one time password is: ${token}`;
	const command = createSendEmailCommand(email, "sethmwebi27@gmail.com", message)

	try {
		return await ses.send(command);
	} catch(e: any){
		console.log("Error sending the email: ", e);
		return e;
	}
}
