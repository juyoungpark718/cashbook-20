interface IConstant {
  LOGIN_REQUIRED: string;
  LOGIN_FAILED: string;
}

const constant: IConstant = {
  LOGIN_REQUIRED: '🔒 로그인이 필요합니다. 로그인 페이지로 이동합니다.',
  LOGIN_FAILED: '⚠️ 로그인에 실패하셨습니다.',
};

export default constant;
