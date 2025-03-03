
let jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환
    req.decoded = jwt.verify(req.headers.authorization.split("Bearer ")[1], process.env.ACCESS_JWT_SECRET);
    req.decoded = jwt.verify(req.headers.authorization.split("Bearer ")[1], process.env.REFRESH_JWT_SECRET);
    return next();
  }

  // 인증 실패
  catch (error) {
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419, // 토큰 누락되거나 맞지 않음
        message: '토큰이 만료되었습니다.' 
      });
    }

    // 토큰의 비밀키가 일치하지 않는 경우
    return res.status(401).json({
      code: 401, 
      message: '유효하지 않은 토큰입니다.'
    });
  }
}