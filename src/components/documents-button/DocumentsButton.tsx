import styles from './DocumentsButton.module.css';

const DocumentsButton = () => {
  return (
    <input className={styles['documents-button']} type="submit" value="Save" />
  );
};

export default DocumentsButton;
