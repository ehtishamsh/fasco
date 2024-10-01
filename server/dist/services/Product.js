"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getAllVariants = getAllVariants;
exports.getAllColors = getAllColors;
exports.getCategoryNameById = getCategoryNameById;
exports.getBrandNameById = getBrandNameById;
exports.findProductByTitle = findProductByTitle;
exports.createProduct = createProduct;
exports.findVariantByNameAndProductId = findVariantByNameAndProductId;
exports.createVariant = createVariant;
exports.findColorByNameAndProductId = findColorByNameAndProductId;
exports.createColor = createColor;
exports.findProductBySlug = findProductBySlug;
exports.findProductById = findProductById;
exports.updateProduct = updateProduct;
exports.getVariantbyId = getVariantbyId;
exports.getColorbyId = getColorbyId;
exports.deleteProduct = deleteProduct;
exports.updateVariant = updateVariant;
exports.updateColor = updateColor;
exports.deleteVariant = deleteVariant;
exports.deleteColor = deleteColor;
exports.getVariantbyProductId = getVariantbyProductId;
exports.getColorbyProductId = getColorbyProductId;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductFilterData = getProductFilterData;
exports.getSearchedProducts = getSearchedProducts;
exports.Delete = Delete;
const db_1 = __importDefault(require("../utils/db"));
async function getAllProducts() {
    return await db_1.default.product.findMany();
}
async function getAllVariants() {
    return await db_1.default.variant.findMany();
}
async function getAllColors() {
    return await db_1.default.color.findMany();
}
async function getCategoryNameById(id) {
    return await db_1.default.category.findUnique({
        where: { id },
    });
}
async function getBrandNameById(id) {
    return await db_1.default.brand.findUnique({
        where: { id },
    });
}
async function findProductByTitle(title) {
    return await db_1.default.product.findFirst({ where: { title } });
}
async function createProduct(data) {
    return await db_1.default.product.create({
        data: {
            battery: data.battery,
            brandId: data.brandId,
            categoryId: data.categoryId,
            cores: data.cores,
            cpu: data.cpu,
            description: data.description,
            frontCamera: data.frontCamera,
            mainCamera: data.mainCamera,
            ram: data.ram,
            screenSize: data.screenSize,
            slug: data.slug,
            title: data.title,
            cover: data.cover,
            price: data.price,
            discounted: data.discounted,
            stock: data.stock,
            features: data.features,
            connectivity: data.connectivity,
            sensor: data.sensor,
            screenType: data.screenType,
            lens: data.lens,
            megapixels: data.megapixels,
            aperture: data.aperture,
            videoResolution: data.videoResolution,
            batteryLife: data.batteryLife,
            gpu: data.gpu,
            compatibleGames: data.compatibleGames,
            maxResolution: data.maxResolution,
            microphone: data.microphone,
            noiseCancellation: data.noiseCancellation,
            wireless: data.wireless,
            numberOfControllers: data.numberOfControllers,
            storage: data.storage,
            type: data.type,
            zoom: data.zoom,
        },
    });
}
async function findVariantByNameAndProductId(name, productId) {
    return await db_1.default.variant.findFirst({
        where: { variant: name, productId },
    });
}
async function createVariant(data) {
    return await db_1.default.variant.create({ data });
}
async function findColorByNameAndProductId(name, productId) {
    return await db_1.default.color.findFirst({
        where: { color: name, productId },
    });
}
async function createColor(data) {
    return await db_1.default.color.create({ data });
}
async function findProductBySlug(slug) {
    return await db_1.default.product.findFirst({ where: { slug } });
}
async function findProductById(id) {
    return await db_1.default.product.findUnique({
        where: { id },
        select: {
            battery: true,
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            brand: {
                select: {
                    id: true,
                    name: true,
                },
            },
            color: {
                select: {
                    id: true,
                    color: true,
                },
            },
            cores: true,
            cover: true,
            cpu: true,
            description: true,
            frontCamera: true,
            id: true,
            mainCamera: true,
            price: true,
            ram: true,
            screenSize: true,
            slug: true,
            discounted: true,
            title: true,
            features: true,
            connectivity: true,
            sensor: true,
            screenType: true,
            lens: true,
            zoom: true,
            megapixels: true,
            aperture: true,
            videoResolution: true,
            batteryLife: true,
            gpu: true,
            compatibleGames: true,
            maxResolution: true,
            microphone: true,
            noiseCancellation: true,
            numberOfControllers: true,
            storage: true,
            type: true,
            wireless: true,
            variant: {
                select: {
                    id: true,
                    price: true,
                    variant: true,
                },
            },
            stock: true,
        },
    });
}
async function updateProduct(data) {
    return await db_1.default.product.update({
        where: { id: data.id },
        data: {
            battery: data.battery,
            brandId: data.brandId,
            categoryId: data.categoryId,
            cores: data.cores,
            cpu: data.cpu,
            description: data.description,
            frontCamera: data.frontCamera,
            mainCamera: data.mainCamera,
            ram: data.ram,
            screenSize: data.screenSize,
            slug: data.slug,
            title: data.title,
            cover: data.cover,
            price: data.price,
            discounted: data.discounted,
            stock: data.stock,
            features: data.features,
            connectivity: data.connectivity,
            sensor: data.sensor,
            screenType: data.screenType,
            lens: data.lens,
            zoom: data.zoom,
            megapixels: data.megapixels,
            aperture: data.aperture,
            videoResolution: data.videoResolution,
            batteryLife: data.batteryLife,
            gpu: data.gpu,
            compatibleGames: data.compatibleGames,
            maxResolution: data.maxResolution,
            microphone: data.microphone,
            noiseCancellation: data.noiseCancellation,
            wireless: data.wireless,
            numberOfControllers: data.numberOfControllers,
            storage: data.storage,
            type: data.type,
        },
    });
}
async function getVariantbyId(id) {
    return await db_1.default.variant.findUnique({
        where: { id },
    });
}
async function getColorbyId(id) {
    return await db_1.default.color.findUnique({
        where: { id },
    });
}
async function deleteProduct(id) {
    return await db_1.default.product.delete({
        where: { id },
    });
}
async function updateVariant(data) {
    return await db_1.default.variant.update({
        where: { id: data.id },
        data: {
            variant: data.variant,
            price: data.price,
        },
    });
}
async function updateColor(data) {
    return await db_1.default.color.update({
        where: { id: data.id },
        data: {
            color: data.color,
        },
    });
}
async function deleteVariant(id) {
    return await db_1.default.variant.delete({
        where: { id },
    });
}
async function deleteColor(id) {
    return await db_1.default.color.delete({
        where: { id },
    });
}
async function getVariantbyProductId(id) {
    return await db_1.default.variant.findMany({
        where: { productId: id },
    });
}
async function getColorbyProductId(id) {
    return await db_1.default.color.findMany({
        where: { productId: id },
    });
}
async function getProductsByCategory(id) {
    return await db_1.default.product.findMany({
        where: { categoryId: id },
    });
}
async function getProductFilterData({ cateID }) {
    return await db_1.default.product.findMany({
        where: {
            categoryId: cateID,
        },
        select: {
            lens: true,
            aperture: true,
            cpu: true,
            ram: true,
            screenType: true,
            screenSize: true,
            storage: true,
            gpu: true,
            mainCamera: true,
            frontCamera: true,
            maxResolution: true,
            megapixels: true,
            zoom: true,
            videoResolution: true,
            brand: {
                select: {
                    name: true,
                },
            },
        },
    });
}
async function getSearchedProducts(query) {
    return await db_1.default.product.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ],
        },
        select: {
            battery: true,
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            brand: {
                select: {
                    id: true,
                    name: true,
                },
            },
            color: {
                select: {
                    id: true,
                    color: true,
                },
            },
            cores: true,
            cover: true,
            cpu: true,
            description: true,
            frontCamera: true,
            id: true,
            mainCamera: true,
            price: true,
            ram: true,
            screenSize: true,
            slug: true,
            discounted: true,
            title: true,
            features: true,
            connectivity: true,
            sensor: true,
            screenType: true,
            lens: true,
            zoom: true,
            megapixels: true,
            aperture: true,
            videoResolution: true,
            batteryLife: true,
            gpu: true,
            compatibleGames: true,
            maxResolution: true,
            microphone: true,
            noiseCancellation: true,
            numberOfControllers: true,
            storage: true,
            type: true,
            wireless: true,
            variant: {
                select: {
                    id: true,
                    price: true,
                    variant: true,
                },
            },
            stock: true,
        },
    });
}
async function Delete(id) {
    return await db_1.default.product.delete({
        where: {
            id,
        },
    });
}
