import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const router = Router();
const prisma = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET!;

// Generate a random 8 digit number as email token
function generateEmailToken(): string {
	return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
	const jwtPayload = { tokenId }

	return jwt.sign(jwtPayload, JWT_SECRET, {
		algorithm: "HS256",
		noTimestamp: true
	})
}

// Create a user if it doesn't exist
// generate the emailToken and send it to their email
router.post("/login", async (req, res) => {
	const { email } = req.body;

	// generate token
	const emailToken = generateEmailToken();
	const expiration = new Date(
		new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
	);
	try {
		const createdToken = await prisma.token.create({
			data: {
				type: "EMAIL",
				emailToken,
				expiration,
				user: {
					connectOrCreate: {
						where: { email },
						create: { email },
					},
				},
			},
		});

		console.log(createdToken);
		// send emailToken to user's email
		return res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: "Couldn't start the authentication process"})
	}
});

// Validate the emailToken
// Generate a long-lived JWT token
router.post("/authenticate", async (req, res) => {
	const { email, emailToken } = req.body;
	const dbEmailToken = await prisma.token.findUnique({
		where: {
			emailToken
		},
		include: {
			user: true
		}
	})
	console.log(dbEmailToken)
	if(!dbEmailToken || !dbEmailToken.valid){
		return res.sendStatus(401)
	}

	if(dbEmailToken.expiration < new Date()){
		return res.status(401).json({ error: "Token expired!"})
	}

	if(dbEmailToken?.user?.email !== email){
		return res.sendStatus(401)
	}

	// Generate an API token
	const expiration = new Date(
		new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
	);
	const apiToken = await prisma.token.create({
		data: {
			type: "API",
			expiration,
			user: {
				connect: {
					email
				}
			}
		}
	});

	// Invalidate the email token
	await prisma.token.update({
		where: { id: dbEmailToken.id},
		data: {valid: false }
	})

	// Generate the JWT token
	const authToken = generateAuthToken(apiToken.id)

	return res.json({authToken})
});
export default router;
