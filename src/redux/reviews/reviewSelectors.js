import {createSelector} from 'reselect'

const selectReviews = state => state.reviews;


export const selectReviewsToDisplay = createSelector(
    [selectReviews],
    reviews=>reviews.reviews
)