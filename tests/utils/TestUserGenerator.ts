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

import { UserEntity } from "../../src/core/domain/entity/user/UserEntity";
import { IUser } from "../../src/core/domain/entity/user/IUser";
import { IAccess } from "../../src/core/domain/entity/access/IAccess";

export class TestUserGeneratorTest {
  static getUser(): UserEntity {
    return new UserEntity({
      id: 1,
      username: "test username",
      contactNo: "test contact",
      rank: 1,
      name: "test full name",
      password: "test password",
      uuid: "test till"
    });
  }

  static createUser(): IUser {
    return {
      id: 1,
      username: "test username",
      contactNo: "test contact",
      rank: 1,
      name: "test full name",
      password: "test password",
      uuid: "test uuid"
    };
  }

  static setUserAccess(): IAccess {
    return {
      id: 1,
      uuid: "test uuid",
      token: "test token",
      startTime: "test start time",
      endTime: "test end time"
    };
  }
}