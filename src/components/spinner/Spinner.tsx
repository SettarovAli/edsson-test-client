import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles['spinner__overlay']}>
      <div className={styles['spinner__container']}></div>
    </div>
  );
};

export default Spinner;
