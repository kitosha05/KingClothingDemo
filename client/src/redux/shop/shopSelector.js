import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectProducts = createSelector(
  [selectShop],
  shop => shop.products
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
      collections ? Object.keys(collections).map(key => collections[key]): []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => 
      collections ? collections[collectionUrlParam] : null
  );

  export const selectProductsByCollection = collectionUrl=>
  createSelector(
    [selectProducts],
    products=> 
    products ? products.filter((e)=>e.collection.toLowerCase()===collectionUrl.toLowerCase()) : null
  )
  export const selectProduct = (productParam) => 
    createSelector(
    [selectProducts],
    products => 
    products ? products.filter((e)=>{return e.name.toLowerCase()==productParam.replace(/-/g," ")})[0] : null
  );

  export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop=> shop.isFetching
  )

  export const selectIsCollectionsLoaded= createSelector(
    [selectShop],
    shop=>!!shop.collections 
  )