import style from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
