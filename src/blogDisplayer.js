import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const BlogDisplayer = ({ key, blog, deleteBlog }) => {
  const navigate = useNavigate();
  return (
    <div className="blog-displayer">
      <div className="blog-displayer-header">
        <div>{`Title: ${blog?.title}`}</div>
        <div>
          <Button
            onClick={() =>
              navigate("/create", { state: { editMode: true, key: blog?.id } })
            }
          >
            Edit
          </Button>
          <Button onClick={() => deleteBlog(key)}>Delete</Button>
        </div>
      </div>
      {blog?.imgUrl.map((img, index) => {
        if (img !== "") {
          return (
            <img
              src={img}
              alt="blog-img"
              height={120}
              width={120}
              key={index}
            />
          );
        }
      })}
      <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
    </div>
  );
};

export default BlogDisplayer;
