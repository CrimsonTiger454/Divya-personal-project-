module.exports = function( req, res, next ) {
    console.log(req.session)
    const { session } = req;
  
    if ( session.user ) {
     console.log(session.user);
      next();
    } else {
        return null;
    }
    next();
  };