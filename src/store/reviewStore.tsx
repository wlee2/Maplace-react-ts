import { Reducer } from "redux";

export const reviewInit = "REVIEW_INIT";
export const reviewUpdate = "REVIEW_UPDATE";
export const reviewEnd = "REVIEW_DATA_END";

export class ReviewModel {
    ID: string = '';
    ReviewContentText: string = '';
    PlaceRate: number = 0;
    AuthorEmail: string = '';
    AuthorPicture: string = '';
    LocationReferenceID: string = '';
    LocationName: string = '';
    Address: string = '';
    GeoLocation: {
        Lat: number,
        Lng: number
    } = { Lat: 0, Lng: 0 };
    Photos: Array<string> = [];
    Comments: Array<string> = [];
    WrittenDate: Date = new Date();
}

export interface ReviewState {
    reviews: ReviewModel[];
    page: number;
    endofData: boolean;
}

const initialState: ReviewState = {
    reviews: [],
    page: 0,
    endofData: false
};

export const reducer: Reducer<ReviewState> = (state = initialState, action: any) => {
    switch (action.type) {
        case reviewInit:
            return {
                reviews: action.reviews,
                page: 0,
                endofData: false
            };
        case reviewUpdate:
            return {
                reviews: [...state.reviews, ...action.reviews],
                page: action.page,
                endofData: action.endOfData
            }
        case reviewEnd:
            return {
                ...state,
                endofData: true
            }
        default:
            return state
    }
};
