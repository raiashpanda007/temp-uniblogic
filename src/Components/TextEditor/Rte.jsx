import React from "react";
import "./Rte.css";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../../conf/config.js";
function Rte({ control, name, label, theme, defaultValue = "" }) {
  return (
    <div className="Text_Editor">
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name || "content"}
        render={({ field: { onChange } }) => (
          <Editor
            
            initialValue={defaultValue}
            apiKey={conf.tinymceApiKey}
            init={{
              height: 500,
              menubar: true,
              branding: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: `
              body { 
                font-family:Helvetica,Arial,sans-serif; 
                font-size:14px; 
                background-color: #f0f0f0; /* Change to desired color */
              }
            `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default Rte;
