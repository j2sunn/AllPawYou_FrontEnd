import { AuthApi, AuthUploadApi } from "./AuthApi";

export const AllReview = () => AuthApi.get(`/api/review`);

// export const CreateReview = () => AuthApi.post(`/api/review`);

export const CreateReview = async (formData) => {
  const response = await AuthUploadApi.post(`/api/review`, formData);
  return response.data;
};

export const getReviewByreviewNo = async (reviewNo) => {
  const response = await AuthApi.get(`/api/review/${reviewNo}`);
  return response.data;
};

export const getReviewByProductId = async (productId) => {
  const response = await AuthApi.get(`/api/review/product/${productId}`);
  return response.data;
};

export const UpdateReview = async (reviewNo, formData) => {
  const response = await AuthUploadApi.put(`/api/review/${reviewNo}`, formData);
  return response.data;
};

export const DeleteReview = (reviewNo) => AuthApi.delete(`/api/review/${reviewNo}`);

export const DeleteImage = (reviewImgNo) => AuthApi.delete(`/api/review/deleteImage/${reviewImgNo}`);

export const ToggleVisibility = (reviewNo) => AuthApi.patch(`/api/review/${reviewNo}/visibility`);

// 별점 평균
// http://localhost:8081/api/review/averageStar?productId=1
export const AverageStar = (productId) => AuthApi.get(`/api/review/averageStar?productId=${productId}`);
