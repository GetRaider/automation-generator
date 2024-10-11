import { expect } from "chai";

import { suiteHelper } from "@helpers/suite/suite.helper";
import { primitivesHelper } from "@helpers/primitives/primitives.helper";
import { userDataHelper } from "@helpers/user-data/user-data.helper";
import { api } from "@helpers/api/api.helper";
import { IGetAllUsers } from "@api/controllers/user/user.controller.types";
import { IGenericHttpResponse } from "@api/http/http.types";

let response: IGenericHttpResponse<IGetAllUsers> = null;
let randomUserName: string = null;
let randomUserAge: number = null;

suiteHelper({
  name: ["Users endpoint, Get all"],
  specs: [
    {
      name: "Successful status code 200",
      test: async () => {
        response = await api.user.getAll(userDataHelper.admin());
        expect(response.status).to.equal(200);
      },
      dependantTests: [
        {
          name: "'name' field has value with 'string' type",
          test: async () => {
            randomUserName =
              response.data.users[
                primitivesHelper.getRandom.number(response.data.users.length)
              ].name;
            expect(typeof randomUserName).to.be.eq("string");
          },
        },
        {
          name: "'age' field has value with 'number' type",
          test: async () => {
            randomUserAge =
              response.data.users[
                primitivesHelper.getRandom.number(response.data.users.length)
              ].age;
            expect(typeof randomUserAge).to.be.eq("number");
          },
        },
      ],
    },
  ],
});
