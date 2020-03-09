// Составные типы

type Id = {
    id: number
};

type Offer = {
    title: string,
    price: number
};

type Review = {
    author?: string,
    message: string
};

type OfferWithId = Id & Offer;

type ReviewWithId = Id & Review;

const List = (items: Array<OfferWithId | ReviewWithId>) => {
    items.forEach((item) => console.dir(item));
};
