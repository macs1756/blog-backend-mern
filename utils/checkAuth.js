import jwt from 'jsonwebtoken'


export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token){
      try {
        
      } catch (error) {

        return res.json({
          messange: '403 Forbidden'
        })
        
      }
    }else{

      return res.json({
        messange: '403 Forbidden'
      })

    }
}