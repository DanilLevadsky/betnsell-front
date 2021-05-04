export class Auction {
  id: number;
  productId: number;
  createdAt: string;
  lotFinishDate: string;
  lotExpireDate: string;

  constructor(id: number, productId: number, createdAt: string, lotFinishDate: string, lotExpireDate: string){
    this.id = id;
    this.productId = productId;
    this.createdAt = createdAt;
    this.lotExpireDate = lotExpireDate;
    this.lotFinishDate = lotFinishDate;
  }
}
