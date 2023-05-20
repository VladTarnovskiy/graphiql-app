// export interface Fields {
//   __fields: [Queries];
// }

export interface Query {
  args: [ArgsTypes];
  name: string;
  description: string;
  type: string;

  // type: TypesInfo;
}
interface ArgsTypes {
  name: string;
  type: string;
  // type: {
  //   name: string;
  //   description: string;
  // };
}

interface TypesInfo {
  __fields: [FieldsInfo];
}

interface FieldsInfo {
  name: string;
  type: {
    ofType: {
      name: string;
      __fields: [FieldItemInfo];
    };
  };
}

interface FieldItemInfo {
  name: string;
  description: string;
  type: {
    name: string;
    description: string;
  };
}
