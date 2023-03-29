const express = require("express");

const candidates = require("../../controllers/candidates");

const router = express.Router();

router.get("/", candidates.getCandidates);
router.get("/:id", candidates.getCandidateById);
router.post("/", candidates.createCandidate);
router.put("/:id", candidates.updateCandidate);
router.delete("/:id", candidates.deleteCandidate);

module.exports = router;
