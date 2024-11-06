import { model, Model, models, Schema } from "mongoose";

const WishlistSchema = new Schema({
  linkedUserId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  linkedServiceId: {
    type: Schema.Types.ObjectId,
    ref: "Services",
  },
  linkedServiceProviderId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

let Wishlist: Model<any>;
try {
  Wishlist = models.Wishlist || model("Wishlist", WishlistSchema, "Wishlist");
} catch (error) {
  Wishlist = model("Wishlist", WishlistSchema, "Wishlist");
}

export default Wishlist;
