# StrangerFie

This prototype is built for a concept of group photo-taking with strangers. Anyone is free to stop by and take a photo. After the photo is completed, it can be saved for other purposes <i>(E.g. publish on social media platforms).</i>

This is a prototype built for Interaction Design Coursework of BSc IT at UWE, Bristol

## Environment Settings

- Node Version `v20.3.1`
- PostgreSQL Version `v15.3`

## ENV Variables

```bash
NODE_ENV="production" # Set as development for dev server
RAPID_API_KEY="YOUR_RAPID_API_KEY" # Get your API key on RapidAPI.com
POSTGRES_PRISMA_URL="YOUR_POSTGRES_DB_URL"
```

Get your API Key on [RapidAPI.com](https://rapidapi.com/hub)

## Subscribe to Face and Plate Blurer API (Freemium)

Register your account at RapidAPI and subscribe to the Face and Plate Blurer API at [Face and Plate Blurer](https://rapidapi.com/firdavscoder1/api/face-and-plate-blurer).
<br/>
There should be a free subscription version with 100 requests/month limit.

## How to Setup/Run

```bash
# Only run on first time setup
npm install
npx prisma db push
npx prisma generate

# For development server
npm run dev

# For actual deployment server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br/>

# Server Endpoints (For Development Purposes)

### Upload Image - `http://localhost:3000/api/uploadFile`

#### Processes

- Remove background
- Blur faces
- Save into database
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

- Retrieve the current person's blurred face from database
- Merge with existing combined group photo from database
- Save into database to update
- Return the merged photo

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

- Retrieve and Merge every previous person's face (Non-blurred)
- Save into database
- Archive all the photos in database
- Send back the merged photo

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

<hr/>

### Get Latest Published Image - `http://localhost:3000/api/getLatestPublishedImage`

#### Processes

- Retrieve latest published image

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

<hr/>

### Has Published Image - `http://localhost:3000/api/hasPublishedImage`

#### Processes

- Check if there is any published image in the database

#### Request [GET]

```ts
"NO PARAMS REQUIRED";
```

#### Response

```ts
body: {
	status: "boolean",
}
```

<hr/>

### Is Setup - `http://localhost:3000/api/isSetup`

#### Processes

- Check if there is already background image taken

#### Request [GET]

```ts
"NO PARAMS REQUIRED";
```

#### Response

```ts
body: {
	status: "boolean",
}
```
