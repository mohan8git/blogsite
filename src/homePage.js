import React, { useEffect } from "react";
import { PageHeader, Button } from "antd";
import BlogDisplayer from "./blogDisplayer";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = React.useState([]);
  const deleteBlog = (id) => {
    const newBlogData = [...blogData];
    const index = newBlogData.findIndex((blog) => blog.id === id);
    newBlogData.splice(index, 1);
    localStorage.setItem("blogData", JSON.stringify(newBlogData));
    setBlogData(newBlogData);
  };
  useEffect(() => {
    localStorage.getItem("blogData") &&
      setBlogData(JSON.parse(localStorage.getItem("blogData")));
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Blog Site"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              navigate("/create");
            }}
          >
            Create Blog
          </Button>
        ]}
      />
      <div className="home-page">
        <h1>Welcome to the Blog Site</h1>
        {blogData.length === 0 && <h2>No blogs yet</h2>}
        {blogData.length > 0 &&
          blogData.map((blog, index) => {
            return (
              <BlogDisplayer key={index} blog={blog} deleteBlog={deleteBlog} />
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
