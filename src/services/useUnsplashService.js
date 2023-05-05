import { useHttp } from "../hooks/http.hook";

const useUnsplashService = () => {
  const { request } = useHttp();

  const _apiBase = "https://api.unsplash.com/photos/";
  const _apiKey = "client_id=oBAkIkZSQcRsipRDqYyCvcak8to1ELT9sehIbAMXJcI";

  const getAllPhotos = async (page) => {
    const res = await request(`${_apiBase}?${_apiKey}&page=${page}`);

    return res.map(_transformPhoto);
  };

  const getPhoto = async (id) => {
    const res = await request(`${_apiBase}${id}?${_apiKey}`);

    return _transformPhoto(res);
  };

  const _transformPhoto = (photo) => {
    return {
      id: photo.id,
      description: photo.alt_description,
      urlFull: photo.urls.full,
      urlSmall: photo.urls.small,
      authorName: photo.user.name,
    };
  };

  return {
    getAllPhotos,
    getPhoto,
  };
};

export default useUnsplashService;
