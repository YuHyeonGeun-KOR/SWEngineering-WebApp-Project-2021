var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next){
    const dump = 'hello world';
    return res.status(200).json({   // 422 status code -> 서버가 요청을 이해는 했으나 해당 내용을 이행할 수 없음을 뜻함
        success: false,
        code: 200,
        data: dump,
    });
});

module.exports = router;