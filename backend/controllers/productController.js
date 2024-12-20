import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller,rating, color, customId } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subCategory || !sizes || !rating || !color || !customId) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Collect uploaded files
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const images = [image1, image2, image3, image4].filter(Boolean);

        // Upload images to Cloudinary
        const imagesUrl = [];
        try {
            for (const item of images) {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                imagesUrl.push(result.secure_url);
            }
        } catch (uploadError) {
            for (const url of imagesUrl) {
                const publicId = url.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            throw new Error("Failed to upload images. Please try again.");
        }

        // Create product object
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            color: JSON.parse(color),
            customId,
            image: imagesUrl,
            date: Date.now(),
            rating: { average: 0, count: 0 },
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added", product: productData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to get single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to edit a product
const editProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, subCategory, sizes, bestseller,rating,color, customId } = req.body;

        // Validate productId
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        // Find the product to update
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Collect uploaded files
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = product.image;
        if (images.length > 0) {
            try {
                imagesUrl = await Promise.all(
                    images.map(async (item) => {
                        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                        return result.secure_url;
                    })
                );
            } catch (uploadError) {
                throw new Error("Failed to upload new images.");
            }
        }

        // Update product fields
        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price: Number(price) }),
            ...(category && { category }),
            ...(subCategory && { subCategory }),
            ...(bestseller !== undefined && { bestseller: bestseller === "true" }),
            ...(sizes && { sizes: JSON.parse(sizes) }),
            ...(color && { color: JSON.parse(color) }),
            ...(customId && { customId }),
            ...(rating && {rating}),
            ...(imagesUrl && { image: imagesUrl }),
            date: Date.now(),
        };

        await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct, editProduct };
