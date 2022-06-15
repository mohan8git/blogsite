import React from "react";
import CreateBlogPage from "./createBlogPage";
import HomePage from "./homePage";
import {Routes, Route, Link} from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogsite" element={<HomePage />} />
        <Route path="/create" element={<CreateBlogPage />} />
    </Routes>
     
    </>
  );
}

export default App;
