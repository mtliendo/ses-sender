import { AdminGetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses'

interface User {
	username: string
}

interface Ask {
	description: string
}

export async function sendEmail(
	userIdentity: AdminGetUserCommandOutput,
	user: User,
	ask: Ask
): Promise<void> {
	console.log('DEBUGGING: Inside sendEmail.ts.')

	const name = user.username || 'Person'
	const description = ask.description || 'No description provided.'
	const templateName = 'curation-request'
	const source = 'mtliendo@focusotter.com'
	const link = 'https://curators.com'
	const companyName = 'http://Curators.com'
	const toAddresses = ['mtliendo+test@focusotter.com']

	const client = new SESClient({ region: 'us-east-1' })

	const input = {
		Source: source,
		Template: templateName,
		Destination: {
			ToAddresses: toAddresses,
		},
		TemplateData: JSON.stringify({
			name: name,
			description: description,
			link: link,
			companyName: companyName,
		}),
	}

	try {
		const command = new SendTemplatedEmailCommand(input)
		console.log('DEBUGGING: Inside Try - Input:', input)
		const response = await client.send(command)
		console.log('Email sent: ', response)
	} catch (err) {
		console.log('Error sending email: ', err)
	}
}
