interface IConstant {
  LOGIN_REQUIRED: string;
  LOGIN_FAILED: string;
  INVALID_TOKEN: string;
}

const constant: IConstant = {
  LOGIN_REQUIRED: '🔒 로그인이 필요합니다. 로그인 페이지로 이동합니다.',
  LOGIN_FAILED: '⚠️ 로그인에 실패하셨습니다.',
  INVALID_TOKEN: '⌛️ 토큰이 만료되었습니다. 다시 로그인 해주세요.',
};

export default constant;
