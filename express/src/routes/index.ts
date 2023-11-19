import { Router, Express, Response, Request } from "express";
import { VoterController } from "../controllers/voter.controller";
import { Voter } from "../interfaces";

const router = Router();
const voterController = new VoterController();

export const start = async (app: Express) => {
    router.post("/create", async (req: Request, res: Response) => {
        const voter: Voter = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            state: req.body.state,
            unit: req.body.unit,
            phoneNumber: req.body.phoneNumber
        };

        const result = voterController.create(voter);

        res.send(result);
    });

    router.get("/:phoneNumber", async (req: Request, res: Response) => {
        const result = voterController.get(req.params.phoneNumber);

        res.send(result);
    });

    router.post("/cast-vote", async (req: Request, res: Response) => {
        const result = voterController.castVote(
            req.body.phoneNumber,
            req.body.pollId,
            req.body.partyId
        );

        res.send(result);
    });

    app.use("/voters", router);
};