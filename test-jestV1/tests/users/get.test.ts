import { suiteHelper } from "@helpers/suite/suite.helper";
import { primitivesHelper } from "@helpers/primitives/primitives.helper";
import { userDataHelper } from "@helpers/user-data/user-data.helper";
import { api } from "@helpers/api/api.helper";

let randomUserName: string = null;
let randomUserAge: number = null;

suiteHelper({
  name: ["Users endpoint, Get all"],
  specs: [
    {
      name: "Successful status code 200",
      test: async () => {
        const { data, status } = await api.user.getAll(userDataHelper.admin());
        randomUserName = data.users[primitivesHelper.getRandom.number(4)].name;
        randomUserAge = data.users[primitivesHelper.getRandom.number(4)].age;
        expect(status).toEqual(200);
      },
      dependantTests: [
        {
          name: "'name' field has value with 'string' type",
          test: async () => {
            expect(typeof randomUserName).toEqual("string");
          },
        },
        {
          name: "'age' field has value with 'number' type",
          test: async () => {
            expect(typeof randomUserAge).toEqual("number");
          },
        },
      ],
    },
  ],
});
