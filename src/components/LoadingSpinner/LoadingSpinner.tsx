import styles from './LoadingSpinner.module.scss';
const LoadingSpinner = () =>  {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
			</div>
		</div>
	);
}
export default LoadingSpinner;