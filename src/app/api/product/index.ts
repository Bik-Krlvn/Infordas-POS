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

import express from "express";
import DIContainer from "../../loc/di.container";
import { ProductController } from "./product.controller";
import passport from "passport";

const router = express.Router();
const controller = DIContainer.resolve<ProductController>(ProductController);

router.post(
  "/create-product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.addProduct(req, res);
  }
);

router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getProducts(req, res);
  }
);

router.get(
  "/product/:identifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getProduct(req, res);
  }
);

router.put(
  "/update-product",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.updateProduct(req, res);
  }
);

router.delete(
  "/product/:identifier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.removeProduct(req, res);
  }
);

export default router;
