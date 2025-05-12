import { useEffect, useState, useCallback } from "react";

interface Props {
    setImage: React.Dispatch<React.SetStateAction<string>>;
  }
  

function CloudinaryUploadWidget({setImage}: Props) {
  const [loaded, setLoaded] = useState(false);
  const uwConfig = {
    cloudName: "text-overlay",
    uploadPreset: "upload-images",
    sources: ["local"],
    multiple: false,
    tags: ["text-overlay"],
  };

  /**
   * Load Cloudinary Upload Widget Script
   */
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = async () => {
    if (loaded) {
      try {
        await window.cloudinary.openUploadWidget(uwConfig, processUploads);
      } catch (error) {
        console.log("failed", error);
      }
    }
  };

  const processUploads = useCallback((error, result) => {
    if (result?.event === "queues-end") {
      console.log('result', result.info.files[0].name);
      setImage(result.info.files[0].name as string);
    }
  }, []);

  return (
    <>
      <button
        id="upload_widget"
        className="bg-blue-600 text-white hover:bg-blue-200 hover:text-black cursor-pointer h-[40px] rounded-lg w-full flex justify-center items-center "
        onClick={initializeCloudinaryWidget}
      >
        Upload Image
      </button>
    </>
  );
}

export default CloudinaryUploadWidget;