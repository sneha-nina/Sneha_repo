export interface Transaction {
amount: string|number;
productName: any;
customerName: any;
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  date: Date;
  createdBy: string; // username or userId
}
