export class AuctionCreateRequest {
  lotFinishDate: string;
  lotExpireDate: string;
  productId: number;

  constructor(lotFinishDate: string, lotExpireDate: string, productId: number) {
    this.lotExpireDate = lotExpireDate;
    this.lotFinishDate = lotFinishDate;
    this.productId = productId;
  }
}
