import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../shared/entities/date-audit.entity';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Users as User } from '@users/users.entity';
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
