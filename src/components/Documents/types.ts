export interface Query {
  args: [ArgsTypes];
  name: string;
  description: string;
  type: string;
}
interface ArgsTypes {
  name: string;
  type: string;
}

export interface FieldsInfo {
  name: string;
  description: string;
  fields: [[string, Fields]];
}

export interface Fields {
  description: string;
  type: string;
}

export interface ScalarType {
  name: string;
  description: string;
}
