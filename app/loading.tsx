import style from './loading.module.scss';

function Loading() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.spinner} />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
