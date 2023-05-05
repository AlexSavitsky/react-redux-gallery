import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAll,
  fetchGallery,
  updateGallery,
} from "../gallery/gallerySlice";

import PhotoCard from "../photoCard/PhotoCard";
import Spinner from "../spinner/Spinner";

import "./gallery.scss";

const Gallery = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectAll);
  const galleryLoadingStatus = useSelector(
    (state) => state.gallery.galleryLoadingStatus
  );
  const page = useSelector((state) => state.gallery.page);

  useEffect(() => {
    dispatch(fetchGallery(page));
  }, [page]);

  useEffect(() => {
    if (photos) {
      window.addEventListener("scroll", showNewPhotoByScrollEnd);
    }
    return () => {
      window.removeEventListener("scroll", showNewPhotoByScrollEnd);
    };
  }, []);

  const showNewPhotoByScrollEnd = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      dispatch(updateGallery());
    }
  };

  const renderItems = (data) => {
    return data.map((item) => {
      return <PhotoCard data={item} key={item.id} />;
    });
  };

  if (galleryLoadingStatus === "loading" && !photos) {
    return <Spinner />;
  }

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="gallery__container">{renderItems(photos)}</div>
    </div>
  );
};

export default Gallery;
