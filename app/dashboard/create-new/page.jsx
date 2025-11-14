"use client"
import React, { useState } from "react"
import ImageSelection from "./_components/ImageSelection"
import RoomType from "./_components/RoomType"
import DesignType from "./_components/DesignType"
import AdditionalReq from "./_components/AdditionalReq" // adjust path if needed
import { Button } from "@/components/ui/button"
import axios from "axios"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/config/firebaseConfig"
import { useUser } from "@clerk/nextjs"
import AiOutputDialog from "../_components/AiOutputDialog"

export default function CreateNew() {
  const { user } = useUser()

  // states
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  // replaced outputResult with aiOutputImage
  const [aiOutputImage, setaiOutputImage] = useState(null)
  const [resultSavedUrl, setResultSavedUrl] = useState(null) // optional: firebase saved url

  // dialog + original image states
  const [openOutputDialog, setOpenOutputDialog] = useState(false)
  const [orgImage, setOrgImage] = useState(null)

  const onHandleInputChange = (value, fieldName) => {
    const newState = { ...formData, [fieldName]: value }
    setFormData(newState)
    console.log("Parent - formData (updated):", {
      [fieldName]: { isFile: value instanceof File, type: value?.type, size: value?.size },
      fullFormData: newState,
    })
  }

  function CustomLoading({ loading }) {
    if (!loading) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="p-6 rounded-2xl bg-white shadow-lg flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" />
          <p className="mt-4 text-sm">Designing your room... please wait</p>
        </div>
      </div>
    )
  }

  const GenerateAiImage = async () => {
    if (loading) return
    if (!formData.image) {
      alert("Please select an image before generating.")
      return
    }
    if (!formData.roomType || !formData.designType) {
      alert("Please choose room type and design type.")
      return
    }

    setLoading(true)
    setaiOutputImage(null)
    setResultSavedUrl(null)
    setOpenOutputDialog(false)
    setOrgImage(null)

    try {
      const rawImageUrl = await SaveRawImageToFirebase()
      console.log("Uploaded rawImageUrl:", rawImageUrl)

      // set original image for dialog preview
      setOrgImage(rawImageUrl)

      const res = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData.roomType,
        designType: formData.designType,
        additionalReq: formData.additionalReq || "",
        userEmail: user?.primaryEmailAddress?.emailAddress || ""
      })

      console.log("backend response:", res?.data)

      const resultPayload = extractImageFromResponse(res.data)

      // use your requested setter
      setaiOutputImage(resultPayload)

      // open dialog so user can preview before/after
      setOpenOutputDialog(true)

      // optionally save generated result
      if (resultPayload && typeof resultPayload === "string") {
        if (resultPayload.startsWith("data:")) {
          const savedUrl = await SaveResultToFirebase(resultPayload)
          setResultSavedUrl(savedUrl)
          console.log("Saved generated result to Firebase:", savedUrl)
        } else if (resultPayload.startsWith("http")) {
          setResultSavedUrl(resultPayload)
        }
      }

      alert("Design complete — preview is shown below.")
    } catch (err) {
      console.error("GenerateAiImage error:", err)
      alert("Upload/Request failed. See console.")
    } finally {
      setLoading(false)
    }
  }

  // helpers
  function extractImageFromResponse(data) {
    if (!data) return null
    if (typeof data === "string") return data
    if (data.result) return data.result
    if (data.imageUrl) return data.imageUrl
    return null
  }

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(",")
    const meta = parts[0]
    const base64 = parts[1]
    const mime = meta.match(/:(.*?);/)[1]
    const binary = atob(base64)
    const len = binary.length
    const arr = new Uint8Array(len)
    for (let i = 0; i < len; i++) arr[i] = binary.charCodeAt(i)
    return new Blob([arr], { type: mime })
  }

  async function SaveRawImageToFirebase() {
    const fileOrData = formData.image
    if (!fileOrData) throw new Error("No image to upload")

    let uploadBlob
    let contentType = "application/octet-stream"

    if (fileOrData instanceof File || fileOrData instanceof Blob) {
      uploadBlob = fileOrData
      contentType = fileOrData.type || contentType
    } else if (typeof fileOrData === "string" && fileOrData.startsWith("data:")) {
      uploadBlob = dataURLToBlob(fileOrData)
      contentType = uploadBlob.type || contentType
    } else if (typeof fileOrData === "string" && fileOrData.startsWith("http")) {
      // if user passed a URL, skip uploading and return the URL
      return fileOrData
    } else {
      console.error("Unsupported image payload:", fileOrData)
      throw new Error("Unsupported image payload.")
    }

    console.log("Uploading to Firebase ->", { contentType, size: uploadBlob.size })
    const ext = contentType.split("/")[1] ? contentType.split("/")[1].split(";")[0] : "png"
    const fileName = `${Date.now()}_raw.${ext}`
    const imageRef = ref(storage, `AI-Room-Designer/${fileName}`)
    const metadata = { contentType }

    const uploadResult = await uploadBytes(imageRef, uploadBlob, metadata)
    console.log("uploadResult.metadata:", uploadResult.metadata)
    const downloadURL = await getDownloadURL(imageRef)
    console.log("downloadURL:", downloadURL)

    // also set as original image (in case you forget)
    setOrgImage(downloadURL)

    return downloadURL
  }

  async function SaveResultToFirebase(resultData) {
    if (!resultData) return null
    if (typeof resultData === "string" && resultData.startsWith("http")) {
      return resultData
    }

    let blob
    if (typeof resultData === "string" && resultData.startsWith("data:")) {
      blob = dataURLToBlob(resultData)
    } else if (resultData instanceof File || resultData instanceof Blob) {
      blob = resultData
    } else {
      console.warn("Unsupported result type for saving:", typeof resultData)
      return null
    }

    const ext = blob.type.split("/")[1] ? blob.type.split("/")[1].split(";")[0] : "png"
    const fname = `result_${Date.now()}.${ext}`
    const refPath = ref(storage, `AI-Room-Designer/results/${fname}`)
    await uploadBytes(refPath, blob, { contentType: blob.type })
    const publicUrl = await getDownloadURL(refPath)
    return publicUrl
  }

  return (
    <div>
      <CustomLoading loading={loading} />

      <h2 className="font-bold text-4xl text-center text-purple-700">Experience the Magic of AI Remodeling</h2>
      <p className="text-center text-gray-400">Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment</p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, "image")} />
        <div>
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, "roomType")} />
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")} />
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, "additionalReq")} />
          <Button className="w-full mt-5" onClick={GenerateAiImage} disabled={loading}>
            {loading ? "Uploading & Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      {/* Preview / Output area */}
      <div className="mt-8">
        {aiOutputImage ? (
          <div className="max-w-3xl mx-auto p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Generated Design</h3>

            {typeof aiOutputImage === "string" ? (
              <div>
                <img
                  src={aiOutputImage}
                  alt="Generated design"
                  className="w-full rounded-md object-contain"
                  style={{ maxHeight: 400 }}
                />
                <div className="mt-3 flex gap-3">
                  <a href={aiOutputImage} download="ai-room-design.png" className="underline text-sm">Download</a>
                  {resultSavedUrl && (
                    <a href={resultSavedUrl} target="_blank" rel="noreferrer" className="underline text-sm">Open saved result</a>
                  )}
                  <button
                    className="text-sm underline"
                    onClick={() => setOpenOutputDialog(true)}
                  >
                    Open slider preview
                  </button>
                </div>
              </div>
            ) : (
              <pre className="text-xs overflow-auto">{JSON.stringify(aiOutputImage, null, 2)}</pre>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500">No generated design yet — click Generate to start.</div>
        )}
      </div>

      {/* Side-by-side slider dialog */}
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  )
}






