import axios from 'axios';
import FormData from 'form-data'; // We need this for Clipdrop

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.json({ success: false, message: "Prompt is required" });
        }

        // 1. Prepare the Form Data for Clipdrop
        const form = new FormData();
        form.append('prompt', prompt);

        // 2. Call Clipdrop API
        // We must set responseType to 'arraybuffer' to handle the raw image data
        const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
                ...form.getHeaders(), // Important: adds the correct Content-Type boundary
            },
            responseType: 'arraybuffer' 
        });

        // 3. Convert the raw binary buffer to a Base64 string
        // This creates a string like "data:image/png;base64,iVBORw0KGgo..."
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;

        // 4. Send back to frontend
        // We use the same key 'imageUrl' so your frontend code doesn't need to change
        res.json({ success: true, imageUrl });

    } catch (error) {
        console.error("Clipdrop Error:", error.message);
        res.json({ success: false, message: "Image generation failed. " + error.message });
    }
};