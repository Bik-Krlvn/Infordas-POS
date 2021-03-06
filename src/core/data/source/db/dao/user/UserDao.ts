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

import { IUser } from "../../../../../domain/entity/user/IUser";

import { IAccess } from "../../../../../domain/entity/access/IAccess";
import { IAdmin } from "../../../../../domain/entity/user/IAdmin";

export interface UserDao {
  getUserWithCredentials(username: string, password: string): Promise<IUser>;

  getUserWithidentifier(identifier: string): Promise<IUser[]>;
  getUsers(): Promise<IUser[]>;

  addUser(user: IUser): Promise<any>;

  addUserAccess(access: IAccess): Promise<any>;
  addAdmin(admin: IAdmin): Promise<any>;
  getAdminWithCredentials(username: string, password: string): Promise<IUser>;
  getAdmins(): Promise<IUser[]>;
  getAdminWithIdentifier(identifier: string): Promise<IUser[]>;
  checkForAdmin(): Promise<boolean>;
}
