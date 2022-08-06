import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import BizzStreamApi from '../api/api';
import {
  IDocumentDefinition,
  IDocumentEntity,
  IDocumentLayout,
  IDocumentsState,
  IFieldValuePayload,
  INewDocument,
} from '../types/documents';

export const fetchDocuments = createAsyncThunk<
  IDocumentEntity[],
  undefined,
  { rejectValue: string }
>('documents/fetchDocuments', async (_, { rejectWithValue }) => {
  try {
    const response = await BizzStreamApi.get('api/documents');

    return response.data.documents;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.response.data || error.message);
  }
});

export const fetchDocumentsDefinitionAndLayout = createAsyncThunk<
  {
    documentsDefinition: IDocumentDefinition;
    documentsLayout: IDocumentLayout;
  },
  undefined,
  { rejectValue: string }
>(
  'documents/fetchDocumentsDefinitionAndLayout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BizzStreamApi.get(
        'api/documents/definitionAndLayout'
      );

      return response.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addDocument = createAsyncThunk<
  IDocumentEntity[],
  { newDocument: INewDocument },
  { rejectValue: string }
>('documents/addDocument', async (newDocument, { rejectWithValue }) => {
  try {
    const response = await BizzStreamApi.post('api/documents', newDocument);

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.response.data || error.message);
  }
});

const initialState: IDocumentsState = {
  documentLayout: null,
  documentDefinition: null,
  entities: [],
  fieldValues: null,
  isLoading: false,
  error: undefined,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setFieldValue: (state, { payload }: PayloadAction<IFieldValuePayload>) => {
      state.fieldValues && (state.fieldValues[payload._id] = payload.value);
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchDocuments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.entities = [];
      })
      .addCase(fetchDocuments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.entities = payload;
      })
      .addCase(fetchDocumentsDefinitionAndLayout.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchDocumentsDefinitionAndLayout.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
          state.entities = [];
        }
      )
      .addCase(
        fetchDocumentsDefinitionAndLayout.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.documentDefinition = payload.documentsDefinition;
          state.documentLayout = payload.documentsLayout;

          const fieldValues = payload.documentsDefinition.schema.fields.reduce(
            (obj, item) => {
              return {
                ...obj,
                [item._id]: '',
              };
            },
            {}
          );

          state.fieldValues = fieldValues;
        }
      )
      .addCase(addDocument.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addDocument.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.entities = [];
      })
      .addCase(addDocument.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.entities = payload;
      });
  },
});

export const { setFieldValue } = documentsSlice.actions;
export default documentsSlice.reducer;

export const selectDocuments = (state: RootState) => state.documents;
export const selectDocumentsFieldValues = (state: RootState) =>
  state.documents.fieldValues;
