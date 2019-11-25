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

import { BaseUseCase } from "../base/BaseUseCase";
import { IUser } from "../../entity/user/IUser";
import { UserRepository } from "../../repository/UserRepository";
import { injectable, inject } from "inversify";
import { UserRepositoryImpl } from "../../../data/repository/user/UserRepositoryImpl";
/**
 * GetUsersTask
 * super class BaseUseCase {@Link ../base/BaseUseCase}
 */
@injectable()
export class GetUsersTask extends BaseUseCase<IUser[], string> {
  private userRepository: UserRepository;

  /**
   * @constructor
   * @param $userRepository require UserRepository instance
   */
  constructor(@inject(UserRepositoryImpl) $userRepository: UserRepository) {
    super();
    this.userRepository = $userRepository;
  }

  protected generateUseCase(input?: string | undefined): Promise<IUser[]> {
    if (input == null) return this.userRepository.getUsers();
    return this.userRepository.getUserWithIdentifier(input);
  }
}
