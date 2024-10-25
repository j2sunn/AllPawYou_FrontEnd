import { useEffect, useState } from "react";
import { deleteMember, listMembers } from "../service/MemberService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [members, setMembers] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllMembers();
  }, []);

  function getAllMembers() {
    listMembers()
      .then((response) => {
        console.log(response.data);
        setMembers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewMember() {
    navigator("/addMember");
  }

  function updateMember(mno) {
    navigator(`/editMember/${mno}`);
  }

  function removeMember(mno) {
    console.log(mno);

    deleteMember(mno)
      .then((response) => {
        console.log(response);
        getAllMembers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">사용자 목록</h2>
      <button className="btn btn-primary mb-2" onClick={addNewMember}>
        사용자 추가
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>프로필사진</th>
            <th>NO</th>
            <th>EMAIL</th>
            <th>NAME</th>
            <th>NICKNAME</th>
            <th>ADDRESS</th>
            <th>PHONE</th>
            <th>GRADE</th>
            <th>CreateAt</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.mno}>
              <td>{member.m_profile}</td>
              <td>{member.mno}</td>
              <td>{member.m_email}</td>
              <td>{member.m_name}</td>
              <td>{member.m_nick}</td>
              <td>{member.m_address}</td>
              <td>{member.m_phone}</td>
              <td>{member.m_grade}</td>
              <td>{member.m_created_at}</td>
              <td>
                <button className="btn btn-info" onClick={() => updateMember(member.mno)}>
                  수정
                </button>
                <button className="btn btn-danger" onClick={() => removeMember(member.mno)} style={{ marginLeft: "10px" }}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
