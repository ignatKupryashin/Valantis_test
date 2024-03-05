import React, {useEffect, useState} from 'react';
import {MainApi} from "./http/MainApi";
import ProductListPage from "./pages/ProductListPage/ProductListPage";

const App = () => {

    return (
        <div>
            <ProductListPage/>
        </div>
    );
};

export default App;