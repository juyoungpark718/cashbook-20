interface IConstant {
  LOGIN_REQUIRED: string;
  LOGIN_FAILED: string;
  INVALID_TOKEN: string;
}

const constant: IConstant = {
  LOGIN_REQUIRED: '๐ ๋ก๊ทธ์ธ์ด ํ์ํฉ๋๋ค. ๋ก๊ทธ์ธ ํ์ด์ง๋ก ์ด๋ํฉ๋๋ค.',
  LOGIN_FAILED: 'โ ๏ธ ๋ก๊ทธ์ธ์ ์คํจํ์จ์ต๋๋ค.',
  INVALID_TOKEN: 'โ๏ธ ํ ํฐ์ด ๋ง๋ฃ๋์์ต๋๋ค. ๋ค์ ๋ก๊ทธ์ธ ํด์ฃผ์ธ์.',
};

export default constant;
