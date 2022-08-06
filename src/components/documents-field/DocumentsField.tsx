import {
  selectDocumentsFieldValues,
  setFieldValue,
} from '../../store/documentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { TDocumentDefinitionField } from '../../types/documents';
import {
  DocumentDefinitionTypesEnum,
  DocumentFieldNameEnum,
} from '../../variables/documents';

import styles from './DocumentsField.module.css';

interface IDocumentsFieldProps {
  field: TDocumentDefinitionField;
}

const DocumentsField = ({ field }: IDocumentsFieldProps) => {
  const fieldValues = useAppSelector(selectDocumentsFieldValues);

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFieldValue({
        _id: field._id,
        value:
          field.type === DocumentDefinitionTypesEnum.NUMBER
            ? +e.target.value
            : e.target.value.replace(/[^a-z]/gi, ''),
      })
    );
  };

  return (
    <div className={styles['documents-field']}>
      <label htmlFor={field._id}>{field.label}</label>
      <input
        className={styles['documents-field__input']}
        id={field._id}
        type={field.type}
        value={fieldValues?.[field._id]}
        onChange={onChangeHandler}
        required
        min={field.name === DocumentFieldNameEnum.AGE ? '1' : undefined}
        maxLength={
          field.name === DocumentFieldNameEnum.NAME &&
          field.type === DocumentDefinitionTypesEnum.TEXT
            ? field.maxLength
            : undefined
        }
      />
    </div>
  );
};

export default DocumentsField;
