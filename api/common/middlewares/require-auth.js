// @ts-ignore
export const requireAuth = (req,res,next) => {
  if (!req.currentUser) {
    throw new Error("Auth required");
  }
  next();
}
