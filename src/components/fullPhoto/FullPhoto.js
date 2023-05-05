import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectById, fetchFullPhoto } from "./fullPhotoSlice";

import Spinner from "../spinner/Spinner";

import "./fullPhoto.scss";

const FullPhoto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fullPhoto = useSelector((state) => selectById(state, id));
  const fullPhotoLoadingStatus = useSelector(
    (state) => state.fullPhoto.fullPhotoLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchFullPhoto(id));
  }, []);

  if (fullPhotoLoadingStatus === "loading" || !fullPhoto) {
    return <Spinner />;
  }

  const { urlFull, description } = fullPhoto;

  return (
    <div className="full-photo">
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go back
      </button>
      <img src={urlFull} alt={description} />
    </div>
  );
};

export default FullPhoto;
