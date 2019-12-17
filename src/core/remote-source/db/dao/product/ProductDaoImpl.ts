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

import { MysqlDatabase } from "../../MysqlDatabase";
import { ProductDao } from "./ProductDao";
import { IProduct } from "../../../../domain/entity/product/IProduct";
import { injectable, inject } from "inversify";
import { PRODUCT_TABLE, CATEGORY_TABLE, BRAND_TABLE } from "../../../../../common/constants";
import { ICategory } from "../../../../domain/entity/product/ICategory";
/**
 * ProductDaoImpl
 */
@injectable()
export class ProductDaoImpl implements ProductDao {
  private db: MysqlDatabase;

  constructor(@inject(MysqlDatabase) $db: MysqlDatabase) {
    this.db = $db;
  }
  removeCategory(identifier: string): Promise<any> {
    const sql = `DELETE FROM ${CATEGORY_TABLE} WHERE id = ? `;
    return this.db.query(sql, [identifier]).then(data => {
      return { message: `${data.affectedRows} item removed` };
    });
  }
  getCategories(): Promise<ICategory[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let sql = `SELECT id,NAME AS name, Description AS description FROM ${CATEGORY_TABLE}`;
        const category: ICategory[] = await this.db.query(sql, []);
        sql = `SELECT c.Name AS name,c.Description AS description, COUNT(p.Category_ID) as count FROM ${CATEGORY_TABLE} c 
        INNER JOIN ${PRODUCT_TABLE} p WHERE c.id = p.Category_ID GROUP BY c.id`;
        const newCategory: ICategory[] = await this.db.query(sql, []);
        for (let i = 0; i < category.length; i++) {
          for (let j = 0; j < newCategory.length; j++) {
            if (category[i].name === newCategory[j].name) {
              category[i].count = newCategory[j].count;
            }
          }
        }
        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }
  getCategoryWithIdentifier(identifier: string): Promise<ICategory[]> {
    const sql = `SELECT id,NAME AS name, Description AS description FROM ${CATEGORY_TABLE} WHERE id = ?`;
    return this.db.query(sql, [identifier]);
  }
  updateCategory(category: ICategory): Promise<any> {
    const sql = `UPDATE ${CATEGORY_TABLE} SET 
    Name = ?, Description = ? WHERE id = ?`;
    return this.db
      .query(sql, [category.name, category.description, category.id])
      .then(data => {
        return { message: `${data.affectedRows} item modified` };
      });
  }

  addCategory(category: ICategory): Promise<any> {
    let sql = `SELECT id FROM ${CATEGORY_TABLE} WHERE Name = ?`;
    return this.db.query(sql, [category.name]).then(data => {
      if (data[0] && data[0].id > 0)
        return { message: `${category.name} already exist` };
      sql = `INSERT INTO ${CATEGORY_TABLE} (Name,Description) VALUES (?,?)`;
      return this.db
        .query(sql, [category.name, category.description])
        .then(data => {
          return { message: `${data.affectedRows} item inserted` };
        });
    });
  }

  //
  // PRODUCT
  //

  removeProduct(identifier: string): Promise<any> {
    const sql = `DELETE FROM ${PRODUCT_TABLE} WHERE Prod_ID = ?`;
    return this.db.query(sql, [identifier]).then(data => {
      return { message: `${data.affectedRows} item deleted` };
    });
  }
  updateProduct(product: IProduct): Promise<any> {
    const sql = `
    UPDATE ${PRODUCT_TABLE} 
    SET
      Name = ?,Buy_Price = ?,Retail_Price = ?,Stock = ?,Unit = ?,Barcode = ?, Category_ID = ?, Brand_ID = ?
    WHERE Prod_ID = ?`;

    return this.db
      .query(sql, [
        product.name,
        product.buyPrice,
        product.retailPrice,
        product.stock,
        product.unit,
        product.barcode,
        product.category,
        product.brand,
        product.uuid
      ])
      .then(data => {
        return { message: `${data.affectedRows} item modified` };
      });
  }
  //
  // ─── GET ALL PRODUCT ────────────────────────────────────────────────────────────
  //

  getProducts(): Promise<IProduct[]> {
    const sql = `
    SELECT
      p.Name AS name,
      p.Prod_ID AS uuid,
      p.Buy_Price AS buyPrice,
      p.Retail_Price AS retailPrice,
      p.Stock AS stock,
      p.Unit AS unit,
      p.Barcode AS barcode,
      c.Name AS category,
      b.Name AS brand
     FROM ${PRODUCT_TABLE} p 
     LEFT OUTER JOIN ${CATEGORY_TABLE} c ON p.Category_ID = c.id
     LEFT OUTER JOIN ${BRAND_TABLE} b ON p.Brand_ID = b.id`;
    return this.db.query(sql, []);
  }
  //
  // ─── GET PRODUCT WITH IDENTIFIER ────────────────────────────────────────────────
  //

  getProductWithIdentifier(identifier: string): Promise<IProduct[]> {
    const sql = `
    SELECT
      p.Name AS name,
      p.Prod_ID AS uuid,
      p.Buy_Price AS buyPrice,
      p.Retail_Price AS retailPrice,
      p.Stock AS stock,
      p.Unit AS unit,
      p.Barcode AS barcode,
      c.Name AS category,
      b.Name AS brand
    FROM ${PRODUCT_TABLE} p
    LEFT OUTER JOIN ${CATEGORY_TABLE} c ON p.Category_ID = c.id
    LEFT OUTER JOIN ${BRAND_TABLE} b ON p.Brand_ID = b.id
    WHERE Prod_ID = ?`;
    return this.db.query(sql, [identifier]);
  }
  //
  // ─── CREATE PRODUCT ─────────────────────────────────────────────────────────────
  //

  addProduct(product: IProduct): Promise<any> {
    const sql = `INSERT INTO ${PRODUCT_TABLE} 
    (Prod_ID,Name,Buy_Price,Retail_Price,Stock,Unit,Barcode,Category_ID,Brand_ID) VALUES(?,?,?,?,?,?,?,?,?)`;

    return this.db
      .query(sql, [
        product.uuid,
        product.name,
        product.buyPrice,
        product.retailPrice,
        product.stock,
        product.unit,
        product.barcode,
        product.category,
        product.brand
      ])
      .then(data => {
        return { message: `${data.affectedRows} item inserted` };
      });
  }
}
