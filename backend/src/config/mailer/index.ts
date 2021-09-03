import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { SMTP_USERNAME, SMTP_PASSWORD } from '@environments';

console.log(SMTP_USERNAME);

export const mailerOptions: MailerOptions = {
  // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  transport: {
    // service: 'Naver',
    host: 'email-smtp.ap-northeast-2.amazonaws.com',
    port: 587,
    auth: {
      user: SMTP_USERNAME, // generated ethereal user
      pass: SMTP_PASSWORD, // generated ethereal password
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: `${process.cwd()}/template/`,
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
};
