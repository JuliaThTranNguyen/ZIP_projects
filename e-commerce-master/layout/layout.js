import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
<div className="flex h-screen bg-indigo-200">
  <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
    <div className={styles.imgStyle}>
      <div className={styles.cartoonImg}></div>
      <div className={styles.cloud_one}></div>
      <div className={styles.cloud_two}></div>
      <div className={styles.cloud_three}></div>
    </div>
    <div className="right flex flex-col justify-evenly overflow-hidden">
      <div className="text-center py-10">
        <div className="text-sm">{children}</div>
      </div>
    </div>
  </div>
</div>


  );
}
