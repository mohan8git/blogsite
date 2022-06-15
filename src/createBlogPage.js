import { PageHeader, Button, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

const CreateBlogPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //create an array to store the image urlls for 5 input
  const [imgUrl, setImgUrl] = useState(["", "", "", "", ""]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setImgUrl(["", "", "", "", ""]);
    setIsModalVisible(false);
  };
  const storeImageUrl = (e, index) => {
    const newImgUrl = [...imgUrl];
    newImgUrl[index] = e;
    setImgUrl(newImgUrl);
  };
  const handleBlogSave = () => {
    if (location?.state?.editMode) {
      const blogData = JSON.parse(localStorage.getItem("blogData"));
      const newBlogData = [...blogData];
      const index = newBlogData.findIndex(
        (blog) => blog.id === location?.state?.key
      );
      newBlogData[index].id = location?.state?.key;
      newBlogData[index].title = title;
      newBlogData[index].content = content;
      newBlogData[index].imgUrl = imgUrl;
      localStorage.setItem("blogData", JSON.stringify(newBlogData));
      navigate("/");
      return;
    }
    const newBlog = {
      id: Math.random(),
      title,
      imgUrl,
      content
    };
    const tempBlogData = JSON.parse(localStorage.getItem("blogData")) || [];
    tempBlogData.push(newBlog);
    localStorage.setItem("blogData", JSON.stringify(tempBlogData));
    navigate("/");
  };
  useEffect(() => {
    //read state from navigate
    if (location?.state?.editMode) {
      const blogData = JSON.parse(localStorage.getItem("blogData"));
      const blog = blogData.find((blog) => blog.id === location?.state?.key);
      setImgUrl(blog.imgUrl);
      setContent(blog.content);
      setTitle(blog.title);
    }
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Create Blog"
      />

      <div className="site-page-content">
        <Input
          placeholder="Enter Blog Title"
          className="image-url-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {imgUrl.map((url, index) => {
          if (url !== "") {
            return (
              <img
                src={url}
                alt="blog-img"
                height={80}
                width={80}
                key={index}
              />
            );
          }
        })}
        <Button type="primary" onClick={showModal}>
          Add images to blog
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <Input
            placeholder="Enter image URL"
            className="image-url-input"
            value={imgUrl[0]}
            id="0"
            onChange={(e) => {
              storeImageUrl(e.target.value, e.target.id);
            }}
          />
          <Input
            placeholder="Enter image URL"
            className="image-url-input"
            value={imgUrl[1]}
            id="1"
            onChange={(e) => {
              storeImageUrl(e.target.value, e.target.id);
            }}
          />
          <Input
            placeholder="Enter image URL"
            className="image-url-input"
            value={imgUrl[2]}
            id="2"
            onChange={(e) => {
              storeImageUrl(e.target.value, e.target.id);
            }}
          />
          <Input
            placeholder="Enter image URL"
            className="image-url-input"
            value={imgUrl[3]}
            id="3"
            onChange={(e) => {
              storeImageUrl(e.target.value, e.target.id);
            }}
          />
          <Input
            placeholder="Enter image URL"
            className="image-url-input"
            value={imgUrl[4]}
            id="4"
            onChange={(e) => {
              storeImageUrl(e.target.value, e.target.id);
            }}
          />
        </Modal>
        <div className="create-blog-page">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            handleBlogSave();
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default CreateBlogPage;
