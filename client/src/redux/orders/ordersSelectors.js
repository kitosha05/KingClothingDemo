import {createSelector} from 'reselect'

const selectOrders = state => state.orders;

export const selectOrder = orderUrlParam =>
  createSelector(
    [selectOrders],
    orders => 
      orders ? orders[orderUrlParam] : null
  );

