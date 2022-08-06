import DocumentsField from '../documents-field/DocumentsField';
import DocumentsButton from '../documents-button/DocumentsButton';
import ErrorComponent from '../error-component/ErrorComponent';
import Spinner from '../spinner/Spinner';

import { INewDocument, INewDocumentField } from '../../types/documents';
import { addDocument, selectDocuments } from '../../store/documentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DocumentLayoutTypesEnum } from '../../variables/documents';

import styles from './DocumentsLayout.module.css';

const DocumentsLayout = () => {
  const { documentLayout, documentDefinition, fieldValues, isLoading, error } =
    useAppSelector(selectDocuments);

  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentDefinition || !fieldValues) return;

    const newDocumentArray: INewDocumentField[] =
      documentDefinition.schema.fields.map((field) => ({
        ...field,
        value: fieldValues[field._id],
      }));

    const newDocument: INewDocument = newDocumentArray.reduce((obj, item) => {
      return {
        ...obj,
        [item._id]: item,
      };
    }, {});

    dispatch(addDocument({ newDocument }));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {documentLayout && documentDefinition && (
            <form
              className={styles['documents-layout']}
              onSubmit={onSubmitHandler}
            >
              {documentLayout.header.rows.map(({ columns }) =>
                columns.map((column, index) => {
                  if (column.type === DocumentLayoutTypesEnum.FIELD) {
                    const field = documentDefinition.schema.fields.find(
                      (field) => field._id === column.fieldId
                    );
                    return (
                      field && <DocumentsField key={field?._id} field={field} />
                    );
                  }
                  if (column.type === DocumentLayoutTypesEnum.BUTTON) {
                    return <DocumentsButton key={`${column.label}-${index}`} />;
                  }
                })
              )}
            </form>
          )}
          {error && <ErrorComponent error={error} />}
        </>
      )}
    </>
  );
};

export default DocumentsLayout;
