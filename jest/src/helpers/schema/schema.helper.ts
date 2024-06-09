import Ajv from "ajv";

export const schemaHelper = {
  client: new Ajv(),
  validate(params: IValidate): boolean {
    const {schema, data} = params;

    return;
  },
};

interface IValidate {
  schema: unknown;
  data: unknown;
}
