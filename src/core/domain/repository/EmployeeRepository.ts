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

import { IEmployee } from "../entity/employee/IEmployee";
import { IEmployeeOther } from "../entity/employee/IEmployeeOther";
import { IEmployeeInfo } from "../entity/employee/IEmployeeInfo";

export interface EmployeeRepository {
  addEmployee(employeeInfo: IEmployee): Promise<any>;
  addEmployeeDetailInfo(employeeDetail: IEmployeeOther): Promise<any>;
  setEmployeeActive(empId: string, status: number): Promise<any>;
  getEmployees(): Promise<IEmployee[]>;
  getEmployeeWithIdentifier(identifier: string): Promise<IEmployee[]>;
  getEmployeeInfo(identifier?: string): Promise<IEmployeeInfo[]>;
  updateEmployee(employee: IEmployeeInfo): Promise<any>;
}
