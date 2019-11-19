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
// ─── EMPLOYEE ROUTE ─────────────────────────────────────────────────────────────
//
import "reflect-metadata";
import express from "express";
import DIContainer from "../../loc/di.container";
import { EmployeeController } from "./employee.controller";
const router = express.Router();

const controller = DIContainer.resolve<EmployeeController>(EmployeeController);

//
// ─── CREATE EMPLOYEE ────────────────────────────────────────────────────────────
//

router.post("/create-new", (req, res) => {
  controller.addNewEmployee(req, res);
});

//
// ─── CHANGE EMPLOYEE STATUS ─────────────────────────────────────────────────────
//

router.put("/change-status", (req, res) => {
  controller.setAccountStatus(req, res);
});

//
// ─── ADD DETAILS ────────────────────────────────────────────────────────────────
//

router.put("/update-details", (req, res) => {
  controller.addEmployeeDetailInfo(req, res);
});

export default router;
