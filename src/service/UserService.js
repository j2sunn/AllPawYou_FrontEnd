import { AuthApi } from "./AuthApi";
// 유저 리스트
export const listUsers = () => AuthApi.get(`/api/v2/users`);
// 유저 삭제
export const deleteUser = (no) => AuthApi.delete(`/api/v2/users/delete/${no}`);
// 유저 권한 변경
// http://localhost:8081/api/v2/users/updateRole?no=1&role=ROLE_SALER
export const updateRole = (no, role) => AuthApi.put(`/api/v2/users/updateRole?no=${no}&role=${role}`);
