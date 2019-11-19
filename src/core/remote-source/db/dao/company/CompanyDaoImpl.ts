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
import { CompanyDao } from "./CompanyDao";
import { ICompany } from "../../../../domain/entity/company/ICompany";
import { MysqlDatabase } from "../../MysqlDatabase";
import { COMPANY_TABLE, BRANCH_TABLE } from "../../../../../common/constants";
import { injectable, inject } from "inversify";
import { IBranch } from "../../../../domain/entity/branch/IBranch";

/**
 * CompanyDaoImpl class
 * class implements CompanyDao {@Link ./CompanyDao}
 */
@injectable()
export class CompanyDaoImpl implements CompanyDao {
  private db: MysqlDatabase;

  constructor(@inject(MysqlDatabase) $db: MysqlDatabase) {
    this.db = $db;
  }
  //
  // ─── BRANCH ─────────────────────────────────────────────────────────────────────
  //
  removeBranch(identifier: string): Promise<any> {
    let sql = `DELETE FROM ${BRANCH_TABLE} WHERE Branch_ID = ?`;
    return this.db.query(sql, [identifier]).then(data => {
      return { message: `${data.affectedRows} record removed` };
    });
  }

  updateBranch(branch: IBranch): Promise<any> {
    let sql = `UPDATE ${BRANCH_TABLE} SET Emp_ID = ?,Comp_ID = ?,Name = ?,Location = ?,Address = ?,Contact = ?,Email = ?,Website = ? WHERE Branch_ID = ?`;
    return this.db
      .query(sql, [
        branch.empId,
        branch.compId,
        branch.name,
        branch.location,
        branch.address,
        branch.contactNo,
        branch.email,
        branch.website,
        branch.uuid
      ])
      .then(data => {
        return { message: `${data.affectedRows} record modified` };
      });
  }

  addBranch(branch: IBranch): Promise<any> {
    let sql = `INSERT INTO ${BRANCH_TABLE} (Branch_ID,Emp_ID,Comp_ID,Name,Location,Address,Contact,Email,Website) VALUES (?,?,?,?,?,?,?,?,?)`;
    return this.db
      .query(sql, [
        branch.uuid,
        branch.empId,
        branch.compId,
        branch.name,
        branch.location,
        branch.address,
        branch.contactNo,
        branch.email,
        branch.website
      ])
      .then(data => {
        return { message: `${data.affectedRows} record inserted` };
      });
  }

  //
  // ─── COMPANY ────────────────────────────────────────────────────────────────────
  //

  addCompany(company: ICompany): Promise<any> {
    let sql = `INSERT INTO ${COMPANY_TABLE} (Name,Location,Address,Contact,Email,Website) VALUES (?,?,?,?,?,?)`;
    return this.db
      .query(sql, [
        company.name,
        company.location,
        company.address,
        company.contactNo,
        company.email,
        company.website
      ])
      .then(data => {
        return { message: `${data.affectedRows} record inserted` };
      });
  }

  updateCompany(company: ICompany): Promise<any> {
    let sql = `UPDATE ${COMPANY_TABLE} SET Name = ?,Location = ?,Address = ?,Contact = ?,Email = ?,Website = ? WHERE id = ?`;
    return this.db
      .query(sql, [
        company.name,
        company.location,
        company.address,
        company.contactNo,
        company.email,
        company.website,
        company.id
      ])
      .then(data => {
        return { message: `${data.affectedRows} record modified` };
      });
  }

  removeCompany(identifier: string): Promise<any> {
    let sql = `DELETE FROM ${COMPANY_TABLE} WHERE id = ?`;
    return this.db.query(sql, [identifier]).then(data => {
      return { message: `${data.affectedRows} record removed` };
    });
  }
}
