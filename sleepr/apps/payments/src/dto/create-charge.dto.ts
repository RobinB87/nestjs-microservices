import { CvcCard } from '@app/common';

export class CreateChargeDto {
  card: CvcCard;
  amount: number;
}
