import styles from './ErrorComponent.module.css';

interface IErrorComponentProps {
  error: string;
}

const ErrorComponent = ({ error }: IErrorComponentProps) => {
  return (
    <div className={styles['error__container']}>
      <div className={styles['error__content']}>
        <div className={styles['error__heading']}>Error</div>
        <div className={styles['error__description']}>{error}</div>
      </div>
    </div>
  );
};

export default ErrorComponent;
