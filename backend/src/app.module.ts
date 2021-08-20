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
import { UsersModule } from './modules/users/users.module';
import { NoticesModule } from './modules/notices/notices.module';
import { LikesModule } from './modules/likes/likes.module';
import { ImagesModule } from './modules/images/images.module';
import { FollowsModule } from './modules/follows/follows.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { MonthsModule } from './modules/months/months.module';
<<<<<<< HEAD
import { SchedulesModule } from '@schedules/schedules.module';
import { winstonOptions, typeormOptions, adminOptions } from './config';
=======
import { typeormOptions, adminOptions } from './config';
>>>>>>> f040b2baa2e2c7237bc78827999e83bcbf8dcdd0

AdminBro.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', STATIC),
    }),
<<<<<<< HEAD
    // WinstonModule.forRoot(winstonOptions),
=======
    // WinstonModule.forRoot(winston),
>>>>>>> f040b2baa2e2c7237bc78827999e83bcbf8dcdd0
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
    FollowsModule,
    FaqsModule,
    ContactsModule,
    CommentsModule,
    ReservationsModule,
    MonthsModule,
    SchedulesModule,
  ],
})
export class AppModule {}
