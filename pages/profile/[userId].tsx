import { useState } from "react";
import styled from "styled-components";
import { apiService } from "../../api";
import { teambleColors } from "../../styles/color";
import { withAuth } from "../../utils/ssr";
import { MyPageMain } from "../../components/template/myPageView/MyPageMain";

interface ProfileByIdProps {
  userId: number;
  userProfileInfo: UserProfileInfo;
  userProfileMetadata: UserProfileMeta;
}

export default function ProfileById(props: ProfileByIdProps) {
  const { userId, userProfileInfo, userProfileMetadata: meta } = props;
  const [userInfo, setUserInfo] = useState<UserProfileInfo>(userProfileInfo);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [type, setType] = useState<number | null>(null);

  function onEdit() {
    setIsEditing((state) => !state);
  }
  const onUpdate: HandleUpdate = (category, payload) => {
    setUserInfo({ ...userInfo, [category]: payload });
  };

  function onSelectedType(selectedId: number): void {
    setType(selectedId);
  }
  return (
    <StyledProfileById>
      <StyledBg />
      <StyledMain>
        <MyPageMain
          user={userInfo}
          meta={meta}
          isEditing={isEditing}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onSelectedType={onSelectedType}
          selectedTypeId={type}
        />
      </StyledMain>
    </StyledProfileById>
  );
}

export const getServerSideProps = withAuth<ProfileByIdProps>(async (context) => {
  const userIdRaw = context.query.userId;
  const userId = tryGetNumber(userIdRaw);

  if (userId === null) {
    return {
      notFound: true,
    };
  }

  const [userProfileInfo, userProfileMetadata] = await Promise.all([
    apiService.userProfile.getProfileById(userId),
    apiService.userProfile.getMetadata(),
  ]);

  return {
    props: {
      userId,
      userProfileInfo: userProfileInfo.user,
      userProfileMetadata: userProfileMetadata.user,
    },
  };
});

function tryGetNumber(val: string | string[] | undefined): number | null {
  if (val !== undefined && !isNaN(+val)) {
    return +val;
  }
  return null;
}

export interface UserProfileInfo {
  id: number; // 유저 아이디
  name: string; // 유저 이름
  email: string; // 유저 이메일
  phone: string; // 유저 핸드폰 번호
  photo: string; // 유저 프로필 사진 url
  university: string; // 유저 대학교
  major: string; // 유저 전공
  area: string; // 유저 활동지역
  intro: string; // 유저 한줄 소개
  description: string; // 유저 소개글
  isDeleted: boolean; // 유저 삭제 여부
  projectId: number | null; // 해당 유저가 만든 프로젝트 id
  type: {
    // 유저 협업 성향
    id: number; // 유저 협업 성향 id
    name: string; // 유저 협업 성향 이름
  } | null;
  tag: // 유저 협업 성향 태그
  {
    id: number; // 유저 협업 성향 태그 id
    name: string; // 유저 협업 성향 태그 이름
  }[];
  position: // 유저 포지션 (최대 2개)
  {
    id: number; // 유저 포지션 id
    name: string; // 유저 포지션 이름
  }[];
  field: // 유저 관심 프로젝트 분야 (최대 3개)
  {
    id: number; // 유저 관심 프로젝트 분야 id
    name: string; // 유저 관심 프로젝트 분야 이름
  }[];
}
export interface UserProfileMeta {
  // 메타데이터
  position: // 협업 포지션
  {
    id: number; // 협업 포지션 id
    name: string; // 협업 포지션 이름
  }[];
  type: // 협업 성향
  {
    id: number; // 협업 성향 id
    name: string; // 협업 성향 이름
  }[];
  field: // 관심 프로젝트 분야
  {
    id: number; // 관심 프로젝트 분야 id
    name: string; // 관심 프로젝트 분야 이름
  }[];
}

export interface HandleUpdate {
  <K extends keyof UserProfileInfo>(category: K, payload: UserProfileInfo[K]): void;
}

const StyledProfileById = styled.div`
  width: 100%;
  flex-grow: 1;
  height: 500vh;
`;
const StyledBg = styled.div`
  width: 100%;
  height: 36.4em;
  background-color: ${teambleColors.brightPurple};
`;
const StyledMain = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 13.7em;
  display: flex;
  justify-content: center;
`;
