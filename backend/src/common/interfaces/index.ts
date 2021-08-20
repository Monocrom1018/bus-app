import { UsersEntity } from 'src/modules/users/users.entity';

export interface BillingKeyProps {
  authKey: string;
  customerKey: string;
}

export interface TotalChargeProps {
  returnDistance: number;
  returnDate: string;
  driver: UsersEntity;
  isReturnPeak: boolean;
}
