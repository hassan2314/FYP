import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    images: {
      type: [String],  // Array of strings for image URLs
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 4;  // Ensure at least 4 images
        },
        message: "You must provide at least 4 images.",
      },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseAggregatePaginate);
export const Product = mongoose.model("Product", productSchema);
