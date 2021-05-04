export class ProductCreateRequest {
  title: string;
  price: number;
  userId: number;
  description: string;
  photo: string;

  constructor(title: string, price: number, userId: number, description: string, photo: string) {
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.description = description;
    this.photo = photo;
  }
}
