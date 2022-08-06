import {
  DocumentDefinitionTypesEnum,
  DocumentLayoutTypesEnum,
} from '../variables/documents';

interface IField {
  type: DocumentLayoutTypesEnum.FIELD;
  fieldId: string;
}

interface IButton {
  type: DocumentLayoutTypesEnum.BUTTON;
  actionType: string;
  label: string;
}

interface IColumn {
  columns: (IField | IButton)[];
}

export interface IDocumentLayout {
  header: {
    rows: IColumn[];
  };
}

export interface IDocumentDefinitionFieldName {
  _id: string;
  label: string;
  name: string;
  type: DocumentDefinitionTypesEnum.TEXT;
  maxLength: number;
}

interface IDocumentDefinitionFieldAge {
  _id: string;
  label: string;
  name: string;
  type: DocumentDefinitionTypesEnum.NUMBER;
}

export type TDocumentDefinitionField =
  | IDocumentDefinitionFieldName
  | IDocumentDefinitionFieldAge;

export interface IDocumentDefinition {
  schema: {
    fields: TDocumentDefinitionField[];
  };
}

export type TFieldValue = string | number;

export type INewDocumentField = TDocumentDefinitionField & {
  value: TFieldValue;
};

export interface IFieldValues {
  [key: string]: TFieldValue;
}

export interface IDocumentEntity {
  [key: string]: TFieldValue;
}

export interface IFieldValuePayload {
  _id: string;
  value: TFieldValue;
}

export interface IDocumentsState {
  documentLayout: IDocumentLayout | null;
  documentDefinition: IDocumentDefinition | null;
  entities: IDocumentEntity[];
  fieldValues: IFieldValues | null;
  isLoading: boolean;
  error: string | undefined;
}

export interface INewDocument {
  [key: string]: INewDocumentField;
}
