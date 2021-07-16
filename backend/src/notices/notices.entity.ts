import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Users as User } from '@users/users.entity';
import { DateAudit } from '@entities/date-audit.entity';

@Entity()
export class Notices extends DateAudit implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @PolymorphicParent(() => [User])
  owner: User;

  @Column({ nullable: true })
  entityId: number;

  @Column({ nullable: true })
  entityType: string;
}
