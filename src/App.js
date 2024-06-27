import styles from "./App.module.css";
import { Located } from "./components/Located/Located";

export const App = () => {
  return (
    <div className={styles.container}>
      <Located />
    </div>
  );
};
