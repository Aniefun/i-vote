"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = require("express");
const voter_controller_1 = require("../controllers/voter.controller");
const router = (0, express_1.Router)();
const voterController = new voter_controller_1.VoterController();
const start = (app) => __awaiter(void 0, void 0, void 0, function* () {
    router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const voter = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            state: req.body.state,
            unit: req.body.unit,
            phoneNumber: req.body.phoneNumber,
            cardNumber: req.body.cardNumber
        };
        const result = voterController.create(voter);
        res.send(result);
    }));
    router.post("/cast-vote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = voterController.castVote(req.body.voterId, req.body.pollId, req.body.partyId);
        res.send(result);
    }));
    app.use("/voters", router);
});
exports.start = start;
