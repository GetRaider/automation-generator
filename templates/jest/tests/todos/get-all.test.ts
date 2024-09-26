import { suiteHelper } from "@helpers/suite/suite.helper";
import { api } from "@helpers/api/api.helper";

suiteHelper({
  name: ["Todo endpoint, Get all"],
  specs: [
    {
      name: "Successful status code 200 and all todos have all required fields",
      test: async () => {
        const { data: todos, status } = await api.todo.getAll();
        expect(status).toBe(200);
        todos.forEach(todo => {
          expect(todo).toHaveProperty("id");
          expect(todo).toHaveProperty("userId");
          expect(todo).toHaveProperty("title");
          expect(todo).toHaveProperty("completed");
        });
      },
    },
  ],
});
