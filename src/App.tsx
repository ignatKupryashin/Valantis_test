import ProductListPage from "./pages/ProductListPage/ProductListPage";
import styles from "./App.module.scss"


const App = () => {

    return (
        <div className={styles.app}>
            <div className={styles.container}>
            <ProductListPage/>
            </div>
        </div>
    );
};

export default App;