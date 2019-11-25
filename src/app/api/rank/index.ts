// Copyright 2019 Bik_krl
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//
// ─── RANK ROUTES ────────────────────────────────────────────────────────────────
//
import "reflect-metadata";
import express from "express";
import DIContainer from "../../loc/di.container";
import { RankController } from "./rank.controller";
import passport from "passport";
const router = express.Router();
const controller = DIContainer.resolve<RankController>(RankController);

//
// ─── CREATE RANK ────────────────────────────────────────────────────────────────
//

router.post(
  "/create-rank",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.addRank(req, res);
  }
);

//
// ─── DELETE RANK ────────────────────────────────────────────────────────────────
//

router.delete(
  "/delete-rank/:identifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.removeRank(req, res);
  }
);

//
// ─── UPDATE RANK ────────────────────────────────────────────────────────────────
//

router.put(
  "/update-rank",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.updateRank(req, res);
  }
);

//
// ─── GET ALL RANKS ──────────────────────────────────────────────────────────────
//

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getRanks(req, res);
  }
);

//
// ─── GET A RANK WITH IDENITIFIER ────────────────────────────────────────────────
//

router.get(
  "/:identifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getRank(req, res);
  }
);

export default router;
