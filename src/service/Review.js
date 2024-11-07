import { AuthApi, AuthUploadApi } from "./AuthApi";

export const AllReview = () => AuthApi.get(`/api/review`);

// export const CreateReview = () => AuthApi.post(`/api/review`);

export const CreateReview = async (formData) => {
  // const data = { userNo, productNo, reviewStar, reviewContent, reviewVisible };
  const response = await AuthUploadApi.post(`/api/review`, formData);
  return response.data;
};

export const getReviewByreviewNo = async (reviewNo) => {
  const response = await AuthApi.get(`/api/review/${reviewNo}`);
  return response.data;
};

export const UpdateReview = async ({ formData }) => {
  // const data = { reviewStar, reviewContent, reviewVisible };\
  console.log(formData);
  const reviewNo = formData.reviewNo;
  const response = await AuthApi.put(`/api/review/${reviewNo}`, formData);
  return response.data;
};

export const DeleteReview = (reviewNo) => AuthApi.delete(`/api/review/${reviewNo}`);
