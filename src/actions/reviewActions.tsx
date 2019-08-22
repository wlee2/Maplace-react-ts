import ReviewService from "../services/reviewService";
import { ReviewModel, reviewInit } from "../store/reviewStore";

const reviewService = new ReviewService();
export const ReviewAction = {
    reviewInit: () => async (dispatch: any) => {
        try {
            const reviewData: ReviewModel[] = await reviewService.getReviews(0);
            console.log(reviewData);
            dispatch({
                type: reviewInit,
                reviews: reviewData
            })
        } catch (error) {
            alert(error);
            console.log(error);
        }
        
    }
}