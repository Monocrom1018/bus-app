import { Users as User } from '@users/users.entity';

export interface BillingKeyProps {
  authKey: string;
  customerKey: string;
}

export interface TotalChargeProps {
  returnDistance: number;
  returnDate: string;
  driver: User;
  isReturnPeak: boolean;
}
