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

import { AddRankTask } from "../../../core/domain/useCase/rank/AddRankTask";
import { RemoveRankTask } from "../../../core/domain/useCase/rank/RemoveRankTask";
import { injectable, inject } from "inversify";
import { UpdateRankTask } from "../../../core/domain/useCase/rank/UpdateRankTask";
import { IRank } from "../../../core/domain/entity/rank/IRank";
import { GetRankTask } from "../../../core/domain/useCase/rank/GetRankTask";

/**
 * RankService class
 */
@injectable()
export class RankService {
  private addRankTask: AddRankTask;
  private removeTask: RemoveRankTask;
  private updateTask: UpdateRankTask;
  private getRankTask: GetRankTask;

  /**
   * @constructor
   * @param $addRankTask require AddRankTask instance
   * @param $removeTask reqiore RemoveRankTask instance
   * @param $updateTask require UpdateRankTask instance
   * @param
   */
  constructor(
    @inject(AddRankTask) $addRankTask: AddRankTask,
    @inject(RemoveRankTask) $removeTask: RemoveRankTask,
    @inject(UpdateRankTask) $updateTask: UpdateRankTask,
    @inject(GetRankTask) $getRankTask: GetRankTask
  ) {
    this.addRankTask = $addRankTask;
    this.removeTask = $removeTask;
    this.updateTask = $updateTask;
    this.getRankTask = $getRankTask;
  }

  addRank(rank: IRank): Promise<any> {
    return this.addRankTask.buildUseCase(rank);
  }

  removeRank(rankId: string): Promise<any> {
    return this.removeTask.buildUseCase(rankId);
  }

  updateRank(rank: IRank): Promise<any> {
    return this.updateTask.buildUseCase(rank);
  }

  getRanks(): Promise<IRank[]> {
    return this.getRankTask.buildUseCase();
  }

  getRankWithIdentifier(identifier: string): Promise<IRank[]> {
    return this.getRankTask.buildUseCase(identifier);
  }
}
