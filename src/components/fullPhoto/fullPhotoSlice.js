import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import useUnsplashService from "../../services/useUnsplashService";

const fullPhotoAdapter = createEntityAdapter();
const initialState = fullPhotoAdapter.getInitialState({
  fullPhotoLoadingStatus: "idle",
});

export const fetchFullPhoto = createAsyncThunk(
  "gallery/fetchFullPhoto",
  async (id) => {
    const { getPhoto } = useUnsplashService();
    return await getPhoto(id);
  }
);

const fullPhotoSlice = createSlice({
  name: "fullPhoto",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullPhoto.pending, (state) => {
        state.fullPhotoLoadingStatus = "loading";
      })
      .addCase(fetchFullPhoto.fulfilled, (state, action) => {
        state.fullPhotoLoadingStatus = "idle";
        fullPhotoAdapter.setOne(state, action.payload);
      })
      .addCase(fetchFullPhoto.rejected, (state) => {
        state.fullPhotoLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = fullPhotoSlice;

export default reducer;

export const { selectById } = fullPhotoAdapter.getSelectors(
  (state) => state.fullPhoto
);

export const {
  fullPhotoFetching,
  fullPhotoFetched,
  fullPhotoFetchingError,
  fullPhotoLoadingStatus,
  fullPhoto,
} = actions;
