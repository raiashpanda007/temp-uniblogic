import React, { useCallback, useEffect, useState } from "react";
import "./PostForm.css";
import {
  ButtonComponent,
  Input,
  Rte,
  SelectOptions,
} from "../../Components/indexComponent";
import service from "../../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setLoading } from "../../store/LoadingSLice";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const isLoading = useSelector((state) => state.Loading.DataLoading);
  const theme = useSelector((state) => state.theme.currtheme);
  const [updatedPost, setUpdatedPost] = useState({});

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      let file = null;
      if (data.image && data.image[0]) {
        file = await service.uploadFile(data.image[0]);
        if (post && post.featureImage) {
          await service.deleteFile(post.featureImage);
        }
      }

      if (post) {
        const updated = await service.updatePost(post.$id, {
          ...data,
          featureImage: file ? file.$id : post.featureImage,
        });
        setUpdatedPost(updated);
        navigate(`/post/${updatedPost.$id}`) // Change 1: Update the state with the updated post
      } else {
        if (file) {
          data.featureImage = file.$id;
        }
        const newPost = await service.createPost({
          ...data,
          userID: user.$id,
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (error) {
      console.log("PostForm :: onSubmit :: error", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.$id);
      setValue("content", post.content);
      setValue("status", post.status);
    }
  }, [post, setValue]);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscribe.unsubscribe();
  }, [watch, setValue, slugTransform]);



  return (
    <div className="Post_Form">
      <div className="Heading_Post_Form">
        <h1>{post?'Edit Post' : 'Create Post'}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Input
          label="Title"
          className={"Input_Title_Post"}
          {...register("title", { required: "Title is required" })}
        />
        <Input
          label="Slug"
          className={"Input_Title_Post"}
          {...register("slug", { required: true })}
          onInput={(e) => setValue("slug", slugTransform(e.target.value))}
        />
        <Rte
          label="Content"
          control={control}
          defaultValue={getValues("content")}
          theme={theme}
        />
        <Input
          label="Post an Image"
          type="file"
          className={"Input_Title_Post"}
          accept="image/png, image/jpeg, image/jpg, image/gif,"
          {...register("image", { required: !post })}
        />
        {post && post.featureImage && (
          <div className="PreviewImage">
            <img
              src={service.getFilePreview(post.featureImage)}
              alt="Feature"
            />
          </div>
        )}
        <SelectOptions
          options={["active", "inactive"]}
          theme={theme}
          className={"Select_Status_Post"}
          {...register("status", { required: true })}
        />
        <ButtonComponent
          label={post ? "Update Post" : "Create Post"}
          type="submit"
          className="Button_Post_Form"
          theme={theme}
        />
      </form>
    </div>
  );
}

export default PostForm;
