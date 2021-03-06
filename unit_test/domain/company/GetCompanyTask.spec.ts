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

import "reflect-metadata";
import { GetCompanyTask } from "../../../src/core/domain/useCase/company/GetCompanyTask";
import { CompanyRepository } from "../../../src/core/domain/repository/CompanyRepository";
import { mock, instance, when, verify } from "ts-mockito";
import { TestCompanyGenerator } from "../../utils/TestCompanyGenerator";
import { assert } from "chai";

describe("domain.useCase.company GetCompanyTask test", () => {
  let getCompanyTask: GetCompanyTask;
  let companyRepository: CompanyRepository;
  let companyRepositoryInstance: CompanyRepository;

  beforeEach(() => {
    companyRepository = mock<CompanyRepository>();
    companyRepositoryInstance = instance(companyRepository);
    getCompanyTask = new GetCompanyTask(companyRepositoryInstance);
  });

  it("Get all company data with no identifier success", async () => {
    const actual = TestCompanyGenerator.getCompanyList();
    when(companyRepository.getCompany()).thenResolve(actual);
    const expected = await getCompanyTask.buildUseCase();
    assert.equal(expected, actual);
    verify(companyRepository.getCompany()).called();
    verify(companyRepository.getCompanyWithIdentifier("")).never()
  });

  it("Get company data with identifier success", async () => {
    const actual = TestCompanyGenerator.getCompany();
    const identifier = "1";
    when(companyRepository.getCompanyWithIdentifier(identifier)).thenResolve(actual);
    const expected = await getCompanyTask.buildUseCase(identifier);
    assert.equal(expected, actual);
    verify(companyRepository.getCompanyWithIdentifier(identifier)).called();
    verify(companyRepository.getCompany()).never();
  });
});
