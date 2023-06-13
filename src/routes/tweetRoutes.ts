import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create tweet
router.post("/", async (req, res) => {
	const { content, image, userId } = req.body;
	try {
		const result = await prisma.tweet.create({
			data: { content, image, userId },
		});
		return res.json(result);
	} catch (e) {
		return res.json({ error: "Username and email should be unique" });
	}
});

// List tweet
router.get("/", async (req, res) => {
	const allTweets = await prisma.tweet.findMany({
		include: { user: { select: { id: true, name: true, username: true, image: true }}}
	});
	return res.json(allTweets);
});

// Get one tweet
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const tweet = await prisma.tweet.findFirst({ where: { id: Number(id) }, include: { user: true } });
	if (!tweet) {
		return res.status(404).json({ error: "Tweet not found!" });
	}
	return res.json(tweet);
});

// update tweet
router.put("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({ error: `not implemented: ${id}` });
});

// delete tweet
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await prisma.tweet.delete({ where: { id: Number(id) } });
	return res.sendStatus(200);
});

export default router;
