import { Router } from "express";

const router = Router()

// Create tweet
router.post("/", (req, res) => {
	return res.status(501).json({error: "not implemented"})
})

// List tweet
router.get("/", (req, res) => {
	return res.status(501).json({error: "not implemented"})
})

// Get one tweet
router.get("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

// update tweet
router.put("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

// delete tweet
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

export default router;