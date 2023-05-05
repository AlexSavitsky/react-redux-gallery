import { configureStore } from "@reduxjs/toolkit";
import gallery from "../components/gallery/gallerySlice";
import fullPhoto from "../components/fullPhoto/fullPhotoSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    gallery,
    fullPhoto,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
