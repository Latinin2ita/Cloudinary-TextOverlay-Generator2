import React, { useRef, useEffect, useState, useMemo } from "react";
import { Settings } from "./App";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text as cloudinaryText } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { fetch } from "@cloudinary/url-gen/qualifiers/source";

interface PlaygroundProps {
  settings: Settings;
  image: string;
}

const Playground: React.FC<PlaygroundProps> = ({ settings, image }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_, setDims] = useState({ width: 0, height: 0 });

  // 1) Only initialize Cloudinary once
  const cld = useMemo(
    () =>
      new Cloudinary({
        cloud: { cloudName: "text-overlay" },
      }),
    []
  );

  // 3) Create the “top” image pipeline (background removal) separately
  const topImage = useMemo(
    () =>
      cld
        .image(image)
        .effect(backgroundRemoval().fineEdges())
        .format("png"),
    [cld, image]
  );


  // 2) Create a fresh “background + text overlay” pipeline on every relevant change
  const backgroundWithText = useMemo(() => {
    const img = cld.image(image);

    // Apply overlay only if there’s text
    if (settings.text) {
      img.overlay(
        source(
          cloudinaryText(
            settings.text,
            new TextStyle(settings.fontFamily, settings.fontSize)
          ).textColor(settings.color)
        ).position(
          new Position()
            .gravity(compass("north_west"))
            .offsetX(Math.round(settings.x))
            .offsetY(Math.round(settings.y))
        )
      ).overlay(source(fetch(
        topImage.toURL()
      )));
    }

    return img;
  }, [
    cld,
    image,
    settings.text,
    settings.fontFamily,
    settings.fontSize,
    settings.color,
    settings.x,
    settings.y,
    topImage
  ]);


  // Measure container once (or when the image URL changes)
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDims({ width: clientWidth, height: clientHeight });
    }
  }, [image]);

  const handleImageLoad = () => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setDims((prev) =>
      prev.width === clientWidth && prev.height === clientHeight
        ? prev
        : { width: clientWidth, height: clientHeight }
    );
  };
  // console.log('backgroundWithText', backgroundWithText.toURL())

  return (
    <div className="flex-1 p-5 flex justify-center items-center flex-col gap-4">
      {image ? (
        <div ref={containerRef} className="relative inline-block overflow-hidden">
          {/* Main background + text */}
          <AdvancedImage
            cldImg={backgroundWithText}
            alt="Background with Text"
            className="block max-w-full h-auto"
            onLoad={handleImageLoad}
          />
          {/* Foreground effect */}
          <AdvancedImage
            cldImg={topImage}
            alt="Foreground Effect"
            className="absolute top-0 left-0 w-full h-full z-20"
          />
        </div>
      ) : (
        <p className="text-gray-500">Please upload an image.</p>
      )}
      { image && <a href={backgroundWithText.toURL()} target="_blank" className="bg-blue-600 text-white hover:bg-blue-200 hover:text-black cursor-pointer h-[40px] rounded-lg w-[200px] flex justify-center items-center">Download Image</a>}
    </div>
  );
};

export default Playground;
