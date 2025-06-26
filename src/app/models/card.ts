export class Card {
  id: string;
  title: string;
  notes: string;
  urls: {
    regular: string;
    small: string;
  };
  alt: string;
  noOfLikes: number;

  constructor(
    id: string,
    title: string,
    notes: string,
    urls: {
      regular: string;
      small: string;
    },
    alt: string,
    noOfLikes: number
  ) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.urls = { regular: urls.regular, small: urls.small };
    this.alt = alt;
    this.noOfLikes = noOfLikes;
  }
}
