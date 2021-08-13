import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { UsersEntity } from '@users/users.entity';
import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('notices')
export class NoticesEntity
  extends DateAuditEntity
  implements PolymorphicChildInterface
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @PolymorphicParent(() => [UsersEntity])
  owner: UsersEntity;

  @Column({ nullable: true })
  entityId: number;

  @Column({ nullable: true })
  entityType: string;
}
