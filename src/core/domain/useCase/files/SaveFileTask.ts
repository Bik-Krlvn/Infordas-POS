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
import { IFile } from "../../entity/files/IFile";
import { FileRepository } from "../../repository/FileRepository";
import { injectable, inject } from "inversify";
import { FileRepositoryImpl } from "../../../data/repository/files/FileRepositoryImpl";

/**
 * SaveFileTask
 * super class BaseUseCase {@Link ../base/BaseUseCase}
 */
@injectable()
export class SaveFileTask extends BaseUseCase<any, IFile> {
  private fileRepository: FileRepository;

  /**
   * @constructor
   * @param $fileRepository require FileRepository
   */
  constructor(@inject(FileRepositoryImpl) $fileRepository: FileRepository) {
    super();
    this.fileRepository = $fileRepository;
  }

  protected generateUseCase(input?: IFile | undefined): Promise<any> {
    if (input == null) throw new Error("file params can't be null");
    return this.fileRepository.saveFile(input);
  }
}
