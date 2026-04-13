export interface OrderState {
  includeBase: boolean;
  customText: string;
  imageUrl: string | null;
  imageFile: File | null;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "in_progress"
  | "shipped"
  | "delivered";
