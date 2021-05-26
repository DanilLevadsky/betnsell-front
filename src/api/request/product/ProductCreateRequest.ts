export class ProductCreateRequest {
  title: string;
  userId: number;
  description: string;
  photo: string;

  constructor(title: string, userId: number, description: string, photo: string) {
    this.title = title;
    this.userId = userId;
    this.description = description;
    this.photo = photo;
  }
}
