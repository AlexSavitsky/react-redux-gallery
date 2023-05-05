import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import useUnsplashService from "../../services/useUnsplashService";

const galleryAdapter = createEntityAdapter();
const initialState = galleryAdapter.getInitialState({
  page: 1,
  galleryLoadingStatus: "idle",
});

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async (page = 1) => {
    const { getAllPhotos } = useUnsplashService();
    return await getAllPhotos(page);
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    updateGallery: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.galleryLoadingStatus = "loading";
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.galleryLoadingStatus = "idle";
        galleryAdapter.addMany(state, action.payload);
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.galleryLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = gallerySlice;

export default reducer;

export const { selectAll } = galleryAdapter.getSelectors(
  (state) => state.gallery
);

export const {
  galleryFetching,
  galleryFetched,
  galleryFetchingError,
  page,
  galleryLoadingStatus,
  updateGallery,
  gallery,
} = actions;
