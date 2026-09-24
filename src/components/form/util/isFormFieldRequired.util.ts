import {
  AnyObjectSchema,
  SchemaDescription,
  SchemaFieldDescription,
  SchemaObjectDescription,
} from 'yup';

const isObjectDescription = (
  description: SchemaFieldDescription,
): description is SchemaObjectDescription => 'fields' in description;

const isSchemaDescription = (
  description: SchemaFieldDescription,
): description is SchemaDescription => 'optional' in description;

export const isFormFieldRequired = (name: string, schema: AnyObjectSchema | undefined): boolean => {
  if (schema === undefined) {
    return false;
  }
  const field = name
    .split('.')
    .reduce<SchemaFieldDescription | undefined>(
      (description, part) =>
        description && isObjectDescription(description)
          ? new Map(Object.entries(description.fields)).get(part)
          : undefined,
      schema.describe(),
    );

  return field !== undefined && isSchemaDescription(field) && !field.optional;
};
