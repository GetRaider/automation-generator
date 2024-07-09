import { expect } from "chai";

import { primitivesHelper } from "@helpers/primitives/primitives.helper";
import { userDataHelper } from "@helpers/user-data/user-data.helper";
import { api } from "@helpers/api/api.helper";
import { suiteV2 } from "@helpers/suiteV2/suiteV2";
import { suiteHelper } from "@helpers/suite/suite.helper";

let randomUserName: string = null;
let randomUserAge: number = null;

suiteV2({
  name: ["Users endpoint, Get all"],
  specs: [
    {
      name: "Successful status code 200",
      test: async () => {
        const { data, status } = await api.user.getAll(userDataHelper.admin());
        randomUserName = data.users[primitivesHelper.getRandom.number(4)].name;
        randomUserAge = data.users[primitivesHelper.getRandom.number(4)].age;
        expect(status).to.equal(200);
      },
      dependantTests: [
        {
          name: "'name' field has value with 'string' type",
          test: async () => {
            expect(typeof randomUserName).to.be.eq("string");
          },
        },
        {
          name: "'age' field has value with 'number' type",
          test: async () => {
            expect(typeof randomUserAge).to.be.eq("number");
          },
        },
      ],
    },
  ],
});
