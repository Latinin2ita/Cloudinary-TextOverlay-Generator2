# Text Overlay Generator

## Install

Clone or fork this repo

```
git@github.com:cloudinary-devs/Cloudinary-TextOverlay-Generator.git
```

## Usage

Install all the dependencies
```
npm i
```

## Cloud Name

Inside of the *App.tsx* file, change the uwConifg to reflect your actual Cloudinary cloud name
```
const uwConfig = {
    cloudName: "ENTER YOUR CLOUD NAME HERE",
    uploadPreset: "upload-images",
    sources: ["local"],
    multiple: false,
    tags: ["text-overlay"],
  };
```

## Upload Preset

Create a upload preset with the name "upload-image". This present should have the following configuration:

- overwrite:false
- use filename:true
- unique filename:false
- type:upload
- access mode:public
- unsigned

## Run the app

Run the React vite server by running the following commnad:

```
npm run dev
```




