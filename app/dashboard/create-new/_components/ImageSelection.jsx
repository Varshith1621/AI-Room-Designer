"use client"
import React, { useEffect, useState } from "react"

function ImageSelection({ selectedImage }) {          // <-- destructure props here
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const onFileSelected = (event) => {
    const f = event.target.files && event.target.files[0]
    if (!f) return

    console.log("ImageSelection - selected file:", { name: f.name, type: f.type, size: f.size })
    setFile(f)
    selectedImage(f) // pass File to parent

    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Select Image of your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border rounded-xl border-dotted flex justify-center border-blue-500 bg-slate-200 cursor-pointer hover:shadow-lg ${file ? "p-0 bg-white" : ""}`}
            style={{ minWidth: 300 }}
          >
            {!previewUrl ? (
              <img src="/imageupload.png" alt="placeholder" width={70} height={70} />
            ) : (
              <img src={previewUrl} alt="preview" style={{ width: 300, height: 300, objectFit: "cover" }} />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  )
}

export default ImageSelection
