# StrangerFie

This is a prototype built for Interaction Design Coursework of BSc IT at UWE, Bristol

## Environment Settings

Node Version `v20.3.1`

## ENV Variables

```bash
RAPID_API_KEY="YOUR_RAPID_API_KEY"
```

Get your API Key on [RapidAPI.com](https://rapidapi.com/hub)

## Subscribe to Hide Your Face API

Register your account at RapidAPI and subscribe to the Hide Your Face API at [HideYourFace](https://rapidapi.com/inuinana/api/hide-your-face/).
<br/>
There should be a free subscription version with 100 requests/month limit.

## How to Setup/Run

```bash
npm install # Only run on first time setup
npm run dev # For development server

# For actual deployment
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Server Endpoints (For Development)

### Upload Image - `http://localhost:3000/api/uploadFile`

#### Processes

- Save the photo uploaded
- Remove background
- Blur faces
- Merge with other strangers (Blurred faces)
- Return back merged photo

#### Request [POST]

```ts
body: {
	image: "base64_image_with_encoding_data";
}
```

#### Response

```ts
body: {
	mergedImage: "base64_image_merged_with_strangers",
	onlyCurrentImage: "base64_image_only_current_person",
	id: "current_image_id"
}
```

<hr/>

### Complete Image - `http://localhost:3000/api/completeImage`

#### Processes

- Get the current person blurred face
- Merge with old photo with strangers
- Save as new base photo for further captures

#### Request [POST]

```ts
body: {
	id: "current_image_id";
}
```

#### Response

```ts
body: {
	image: "base64_image_with_blurred_faces",
}
```

<hr/>

### Publish Image - `http://localhost:3000/api/publishImage`

#### Processes

- Merge every previous person's face (Non-blurred)
- Archive all the photos
- Send back the merged photo
- Prepare the server for new set of group photo

#### Request [GET]

```ts
"NO PARAMS REQUIRED";
```

#### Response

```ts
body: {
	image: "base64_image",
}
```
