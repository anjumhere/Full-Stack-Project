const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      res.next(error);
    });
  };
};
export { asyncHandler };

// const requestHandler =(fn)=> async(req,res,next)=>{
// try {
//   fn(req,res,next)
// } catch (error) {
//   req.status(error.code || 500).json({
//     success: false,
//     message: error.message
//   })
// }
// }
