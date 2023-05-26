import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    //5
    {
        title: {
            type: String,
            required: true
        }, //제품 명
        price: {
            type: Number,
            default: 0
        }, //제품 가격
        description: {
            type: String,
            min: 3,
            max: 300
        }, //제품 설명
        brand: String, //브랜드
        company: String, //제조 기업
        stock: {
            type: Number,
            default: 0
        } //재고량
    },
    {
        timestamps: true
    }
)

const productModel = mongoose.model("product", productSchema) //테이블명 설정

export default productModel