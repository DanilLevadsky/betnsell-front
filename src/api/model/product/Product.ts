export class Product {
  title: string;
  price: number;
  userId: number;
  description: string;
  photo: string;
  id: number;

  constructor(title: string, price: number, userId: number, description: string, photo: string, id:number) {
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.description = description;
    this.photo = photo;
    this.id = id;
  }
}
