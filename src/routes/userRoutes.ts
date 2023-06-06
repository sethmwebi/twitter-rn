import { Router } from "express";

const router = Router()

// Create user
router.post("/", (req, res) => {
	return res.status(501).json({error: "not implemented"})
})

// List user
router.get("/", (req, res) => {
	return res.status(501).json({error: "not implemented"})
})

// Get one user
router.get("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

// update user
router.put("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

// delete user
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	return res.status(501).json({error: `not implemented: ${id}`})
})

export default router;