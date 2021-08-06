import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from '@admin-bro/nestjs';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NoticesModule } from './notices/notices.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { FollowsModule } from './follows/follows.module';
import { FaqsModule } from './faqs/faqs.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommentsModule } from './comments/comments.module';
import { ReservationsModule } from './reservations/reservations.module';
import { adminBroOptions } from './config/adminBroOptions';
import { MonthsModule } from './months/months.module';

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
      entities: [`${__dirname}/**/*.entity.{js, ts}`],
      synchronize: false,
    }),
    MulterModule.register({
      dest: '../uploads',
    }),
    AuthModule,
    UsersModule,
    NoticesModule,
    LikesModule,
    ImagesModule,
    FollowsModule,
    FaqsModule,
    ContactsModule,
    CommentsModule,
    ReservationsModule,
    MonthsModule,
  ],
})
export class AppModule {}
