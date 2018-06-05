module.exports = function( req, res, next ) {
    const { session } = req;
  
if ( !session.user ) {
     res.sendStatus(401)
    } 
  };