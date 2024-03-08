import React, {Dispatch, SetStateAction} from 'react';
import {Button} from "antd";
import styles from "./PageSwitcher.module.scss"

interface PageSwitcherProps {
    totalPagesCount: number,
    currentPage: number,
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setCurrentPage: Dispatch<SetStateAction<number>>
}

const PageSwitcher = (props: PageSwitcherProps) => {

    const nextPage = () => {
        if (props.currentPage < (props.totalPagesCount - 1)) {
            props.setIsLoading(true);
            props.setCurrentPage(props.currentPage + 1)
        }
    }
    const previousPage = () => {
        if (props.currentPage > 0) {
            props.setIsLoading(true);
            props.setCurrentPage(props.currentPage - 1)
        }
    }

    return (
        <div className={styles.pageSwitcher}>
            {!!props.totalPagesCount && <>
                <Button onClick={previousPage}>PREV PAGE</Button>
                <p className={styles.pagesCount}> Страница: {props.currentPage + 1} из {props.totalPagesCount} </p>
                <Button onClick={nextPage}>NEXT PAGE</Button>
            </>}
        </div>
    );
};

export default PageSwitcher;