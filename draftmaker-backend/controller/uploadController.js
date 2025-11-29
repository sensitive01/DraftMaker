const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload single/multiple from array
const uploadArrayToCloudinary = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded"
            });
        }

        const fileType = req.body.fileType || "documents";

        const folderPath = `draft-documents/${new Date().toISOString().split("T")[0]}/${fileType}`;

        let uploadedFiles = [];

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderPath,
                resource_type: "auto",
                use_filename: true,
                unique_filename: true,
                overwrite: false
            });

            uploadedFiles.push({
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                resourceType: result.resource_type,
                bytes: result.bytes
            });

            // Delete temp file
            fs.unlinkSync(file.path);
        }

        return res.status(200).json({
            success: true,
            filesCount: uploadedFiles.length,
            files: uploadedFiles
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Upload failed",
            error: error.message
        });
    }
};

module.exports = { uploadArrayToCloudinary };
