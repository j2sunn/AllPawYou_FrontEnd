import { AuthApi } from "./AuthApi";

export const AllReview = () => AuthApi.get(`/api/review`);

// export const CreateReview = () => AuthApi.post(`/api/review`);

export const CreateReview = async ({ userNo, productNo, reviewStar, reviewContent, reviewVisible }) => {
  const data = { userNo, productNo, reviewStar, reviewContent, reviewVisible };
  const response = await AuthApi.post(`/api/review`, data);
  return response.data;
};

export const UpdateReview = async ({ reviewNo, userNo, productNo, reviewStar, reviewContent, reviewVisible }) => {
  const data = { reviewNo, userNo, productNo, reviewStar, reviewContent, reviewVisible };
  const response = await AuthApi.put(`/api/review`, data);
  return response.data;
};

export const DeleteReview = (reviewNo) => AuthApi.delete(`/api/review/${reviewNo}`);
