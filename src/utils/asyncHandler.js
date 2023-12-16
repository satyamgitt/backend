// ! make hire order function because we need to accept a function as a parameter and return a function

// promise methods
const asyncHandeler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export default asyncHandeler;






// accepting a function and we need to execute this function also for that passed in another function(tryCatch method)
// const asyncHandeler = (fn) => async (req, res, next) => {

//     try {
//           await fn(req, res, next);
//     } catch (error) {
//         res.status(error.Code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }