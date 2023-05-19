/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
  GraphQLSchema,
} from 'graphql';
import { RootState } from '../store';

interface InitialState {
  status: '' | 'loading' | 'succeeded' | 'failed';
  response: IntrospectionQuery;
  error: string;
}

const initialState: InitialState = {
  status: '',
  response: {} as IntrospectionQuery,
  error: '',
};

export const fetchDocsRequest = createAsyncThunk('docs/fetchDocsRequest', async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    const data = await response.json();
    // const editData = JSON.stringify(data, null, '\t');
    // const schema = buildClientSchema(datax);
    return data.data;
  } catch (e) {
    return e;
  }
});

export const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setResponse: (state, { payload }) => {
      state.response = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDocsRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocsRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(fetchDocsRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export default docsSlice.reducer;

export const { setResponse } = docsSlice.actions;

export const selectDocsResponseValue = (state: RootState) => state.docs.response;
export const selectDocsResponseStatus = (state: RootState) => state.docs.status;
export const selectDocsResponseError = (state: RootState) => state.docs.error;

//  // const editData = JSON.stringify(data, null, '\t');
//  const datax = data.data;
//  const schema = buildClientSchema(datax).getQueryType()?.getFields();
//  // const schema = buildClientSchema(datax).getType('__Schema');
//  // const x = JSON.stringify(schema);
//  // const z: Fields = JSON.parse(x);

//  // const editData = JSON.stringify(schema, null, '\t');
//  const x = JSON.stringify(schema);
//  const z: Fields[] = Object.values(JSON.parse(x));
//  // const z = JSON.parse(x);
//  // const arr: [Fields] = [];
//  // z.forEach((item) => {
//  //   arr.push(item);
//  // });

// import {
//   IntrospectionQuery,
//   getIntrospectionQuery,
//   buildClientSchema,
//   printSchema,
//   buildSchema,
//   GraphQLObjectType,
// } from 'graphql';
// import { useEffect, useState } from 'react';
// import {
//   selectDocsResponseError,
//   selectDocsResponseStatus,
//   selectDocsResponseValue,
//   fetchDocsRequest,
// } from 'src/app/slice/DocsSlice';
// import { Fields } from './typeTwo';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import Loader from '../Loader/Loader';
// import FieldsComponent from './Fields/Fields';

// function Documents(): JSX.Element {
//   const [docs, setDocs] = useState<Array<Fields>>();
//   const [fieldsFlag, setFieldsFlag] = useState(false);

//   const dispatch = useAppDispatch();
//   const docsResponseValueFromStorage = useAppSelector(selectDocsResponseValue);
//   const docsResponseStatusFromStorage = useAppSelector(selectDocsResponseStatus);
//   const docsResponseErrorFromStorage = useAppSelector(selectDocsResponseError);

//   useEffect(() => {
//     dispatch(fetchDocsRequest());
//   }, []);

//   const getData = async () => {
//     // try {
//     //   const response = await fetch('https://rickandmortyapi.com/graphql', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       query: getIntrospectionQuery(),
//     //     }),
//     //   });
//     //   const data = await response.json();
//     //   const datax = data.data;
//     const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
//     const x = JSON.stringify(schema);
//     const z: Fields[] = Object.values(JSON.parse(x));
//     console.log(z);
//     setDocs(z);
//     // } catch (e) {
//     //   // setDocs(`${e}`);
//     // }
//   };

//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   return (
//     <div className="flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base docs font-normal text-base_green docs xs:text-sm max-w-[45vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] overflow-auto">
//       <div className="docs__title text-2xl pr-8">Documents</div>
//       <div className="docs__content text-base_dark whitespace-break-spaces dark:text-base_white">
//         {/* <div className="root__description mb-2">
//           A GraphQL schema provides a root type for each kind of operation.
//         </div>
//         <div className="root__title mb-2">- Root Types</div>
//         <div className="root__link">
//           <span className="text-base_green">query: </span>
//           <button
//             className="types__link text-base_yellow_dark hover:underline"
//             type="button"
//             // onClick={}
//           >
//             Query
//           </button>
//         </div> */}

//         {fieldsFlag && docs && <FieldsComponent docs={docs} />}

//         {!fieldsFlag && docsResponseStatusFromStorage === 'succeeded' && (
//           <div className="root__wrapper">
//             <div className="root__description mb-2">
//               A GraphQL schema provides a root type for each kind of operation.
//             </div>
//             <div className="root__title mb-2">- Root Types</div>
//             <div className="root__link">
//               <span className="text-base_green">query: </span>
//               <button
//                 className="types__link text-base_yellow_dark hover:underline"
//                 type="button"
//                 onClick={() => {
//                   getData();
//                   setFieldsFlag(true);
//                 }}
//               >
//                 Query
//               </button>
//             </div>
//           </div>
//         )}
//         {docsResponseStatusFromStorage === 'loading' && (
//           <div className="m-auto w-fit mt-[20vh]">
//             <Loader />
//           </div>
//         )}
//         {docsResponseStatusFromStorage === 'failed' && docsResponseErrorFromStorage}
//       </div>
//     </div>
//   );
// }

// export default Documents;
