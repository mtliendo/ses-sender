/* Amplify Params - DO NOT EDIT
API_C8GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
API_C8GRAPHQL_GRAPHQLAPIIDOUTPUT
ENV
REGION
Amplify Params - DO NOT EDIT */

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

	const name = user.username
	const description = ask.description
	const templateName = 'curation-request'
	const source = 'mtliendo@gmail.com'
	const link = 'https://curators.com'
	const companyName = 'http://Curators.com'

	const client = new SESClient({ region: 'us-east-1' })

	const input = {
		Source: source,
		Template: templateName,
		Destination: {
			ToAddresses: ['mtliendo@focusotter.com'] as string[],
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
