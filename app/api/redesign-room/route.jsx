import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

  try {
    const input = {
      image: imageUrl,
      prompt:
        "A stunning " +
        roomType +
        " designed in a " +
        designType +
        " style " +
        (additionalReq || "") +
        " highly detailed, photorealistic, professional interior render, 8K quality, perfect lighting, warm tones.",
    };

    // You can uncomment this line when you want to use the real Replicate model
     const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    // console.log(output.url());
    // return NextResponse.json({ result: output });

    // TEMPORARY static output URL for testing
    //const output = "https://replicate.delivery/xezq/JfqvbMjrjhyWd6GRAuyvZKCUduduWnmfl3uTbj7geV8m3edWB/out.png";

    // Convert Output URL to Base64
    const base64Image = await ConvertImageToBase64(output);

    // Save Base64 to Firebase
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "AI-Room-Designer/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Firebase upload complete:", downloadURL);

    // Save All to Database
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        RoomType: roomType,
        DesignType: designType,
        orgImage: imageUrl,
        aiImage: downloadURL,
        userEmail: userEmail || "",
      })
      .returning({ id: AiGeneratedImage.id });

    console.log("DB result:", dbResult);
    return NextResponse.json({ result: downloadURL });
  } catch (e) {
    console.error("Error in redesign-room route:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
