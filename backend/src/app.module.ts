import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from '@admin-bro/nestjs';
import { join } from 'path';
import { STATIC } from '@environments';
import { AuthModule } from '@auth/auth.module';
import { SchedulesModule } from '@schedules/schedules.module';
import { FilesModule } from '@files/files.module';
import { UsersModule } from '@users/users.module';
import { NoticesModule } from '@notices/notices.module';
import { LikesModule } from '@likes/likes.module';
import { ImagesModule } from '@images/images.module';
import { FaqsModule } from '@faqs/faqs.module';
import { ContactsModule } from '@contacts/contacts.module';
import { CommentsModule } from '@comments/comments.module';
import { ReservationsModule } from '@reservations/reservations.module';
import { MonthsModule } from '@months/months.module';
import { ChatroomsModule } from '@chatrooms/chatrooms.module';
import { UsersChatroomsModule } from '@users-chatrooms/user-chatrooms.module';
import { typeormOptions, adminOptions } from './config';

AdminBro.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', STATIC),
    }),
    AdminModule.createAdmin(adminOptions),
    TypeOrmModule.forRoot(typeormOptions),
    MulterModule.register({
      dest: '../uploads',
    }),
    AuthModule,
    UsersModule,
    NoticesModule,
    LikesModule,
    ImagesModule,
    FaqsModule,
    ContactsModule,
    CommentsModule,
    ReservationsModule,
    MonthsModule,
    SchedulesModule,
    FilesModule,
    ChatroomsModule,
    UsersChatroomsModule,
  ],
})
export class AppModule {}
