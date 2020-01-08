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

import { IClient } from "../entity/crm/IClient";

export interface CrmRepository {
  addCustomer(customer: IClient): Promise<any>;
  addSupplier(supplier: IClient): Promise<any>;
  getCustomer(): Promise<IClient[]>;
  getCustomerWithIdentifier(identifier: string): Promise<IClient[]>;
  getSupplier(): Promise<IClient[]>;
  getSupplierWithIdentifier(identifier: string): Promise<IClient[]>;
  updateCustomer(customer: IClient): Promise<any>;
  updateSupplier(supplier: IClient): Promise<any>;
}
