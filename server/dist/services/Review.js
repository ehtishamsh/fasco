"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getOne = getOne;
exports.getReviewsByUserID = getReviewsByUserID;
exports.create = create;
exports.getReviewsByUserIDandProductID = getReviewsByUserIDandProductID;
exports.getReviewsByProductID = getReviewsByProductID;
const db_1 = __importDefault(require("../utils/db"));
async function getAll() {
    return await db_1.default.review.findMany();
}
async function getOne(userid, productid) {
    return await db_1.default.review.findMany({
        where: {
            userId: userid,
            productId: productid,
        },
    });
}
async function getReviewsByUserID(id) {
    return await db_1.default.review.findMany({
        where: {
            userId: id,
        },
    });
}
async function create({ comment, rating, userid, productId, }) {
    return await db_1.default.review.create({
        data: {
            comment: comment,
            rating,
            productId,
            userId: userid,
        },
    });
}
async function getReviewsByUserIDandProductID({ userid, productid, }) {
    return await db_1.default.review.findFirst({
        where: {
            userId: userid,
            productId: productid,
        },
        select: {
            comment: true,
            rating: true,
            product: {
                select: {
                    cover: true,
                    slug: true,
                    title: true,
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            createdAt: true,
        },
    });
}
async function getReviewsByProductID(id) {
    return await db_1.default.review.findMany({
        where: {
            productId: id,
        },
        select: {
            id: true,
            comment: true,
            createdAt: true,
            rating: true,
            updatedAt: true,
            productId: true,
            userId: true,
            user: {
                select: {
                    firstname: true,
                    lastname: true,
                },
            },
        },
    });
}
