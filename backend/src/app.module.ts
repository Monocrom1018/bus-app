import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidateNested } from 'class-validator';
import { AdminModule } from '@admin-bro/nestjs';
import { ObjectsModule } from './objects/objects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhoneCertificationsModule } from './phone-certifications/phone-certifications.module';
import { NoticesModule } from './notices/notices.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { FollowsModule } from './follows/follows.module';
import { FaqsModule } from './faqs/faqs.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommentsModule } from './comments/comments.module';
import { Users as User } from './users/users.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { adminBroOptions } from './config/adminBroOptions';

AdminBro.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule.createAdmin(adminBroOptions),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      // entities: [join(__dirname, '..', 'src', '**', '*.entity{.ts,.js}')],
      entities: [`${__dirname}/**/*.entity.{js, ts}`],
      synchronize: false,
    }),
    MulterModule.register({
      dest: '../uploads',
    }),
    ObjectsModule,
    AuthModule,
    UsersModule,
    PhoneCertificationsModule,
    NoticesModule,
    LikesModule,
    ImagesModule,
    FollowsModule,
    FaqsModule,
    ContactsModule,
    CommentsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
