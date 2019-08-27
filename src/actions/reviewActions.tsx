import ReviewService from "../services/reviewService";
import { ReviewModel, reviewInit, reviewUpdate, reviewEnd } from "../store/reviewStore";
import { openSnackbar } from "../store/snackbarStore";

const reviewService = new ReviewService();
export const ReviewAction = {
    reviewInit: (done?: CallableFunction) => async (dispatch: any) => {
        try {
            const reviewData: ReviewModel[] = await reviewService.getReviews(0);
            dispatch({
                type: reviewInit,
                reviews: reviewData
            })
            if(done) {
                done(true)
            }
        } catch (error) {
            alert(error.error);
            console.log(error);
            if(done) {
                done(false)
            }
        }
    },
    reviewUpdate: (page: number, done: CallableFunction) => async (dispatch: any) => {
        try {
            const reviewData: ReviewModel[] = await reviewService.getReviews(page);
            if(reviewData.length !== 0) {
                dispatch({
                    type: reviewUpdate,
                    reviews: reviewData,
                    page: page,
                    endOfData: reviewData.length !== 5
                })
            }
            else {
                dispatch({
                    type: reviewEnd
                })
            }
            done(null, true)
        } catch (error) {
            alert(error.error);
            console.log(error);
            done(error, false)
        }
    },
    reviewDelete: (id: string, done: CallableFunction) => async (dispatch: any) => {
        try {
            const result = await reviewService.deleteReview(id);
            if(result) {
                const reviewData: ReviewModel[] = await reviewService.getReviews(0);
                dispatch({
                    type: reviewInit,
                    reviews: reviewData
                })
                done(true);
            }
        } catch (error) {
            alert(error.error);
            console.log(error);
            done(false);
        }
    },
    accessDenied: (status: 'Success' | 'Error', message: string) => (dispatch: any) => {
        dispatch({
            type: openSnackbar,
            status: status,
            message: message
        })
    }
}