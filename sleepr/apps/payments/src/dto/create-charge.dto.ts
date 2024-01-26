import { CvcCard } from '../payments.service';

export class CreateChargeDto {
  card: CvcCard;
  amount: number;
}
