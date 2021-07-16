import { Users as User } from '@users/users.entity';
import { AdminUsers as AdminUser } from '@adminUsers/adminUsers.entity';
import { Notices as Notice } from '@notices/notices.entity';
import { Faqs as Faq } from '@faqs/faqs.entity';
import { Reservations as Reservation } from '@reservations/reservations.entity';
import { ReservationsUsers as ReservationsUser } from '@reservations_users/reservations_users.entity';

export const adminBroOptions = {
  adminBroOptions: {
    rootPath: '/admin',
    resources: [User, AdminUser, Notice, Faq, Reservation, ReservationsUser],
    locale: {
      language: 'ko',
      translations: {
        properties: {
          name: '이름',
          email: '이메일',
          createdAt: '생성일',
          updatedAt: '수정일',
          registration_confirmed: '가입승낙여부',
          profile_img: '프로필사진 URL',
          phone: '휴대폰번호',
          user_type: '유저타입',
          password: '비밀번호',
          title: '제목',
          body: '내용',
          question: '질문',
          answer: '답변',
        },
        actions: {
          new: '새로 만들기',
          show: '상세보기',
          edit: '수정하기',
          delete: '삭제하기',
          bulkDelete: '선택삭제',
        },
        buttons: {
          login: '로그인',
        },
      },
    },
  },
  auth: {
    authenticate: async (email, password) => {
      const admin = await AdminUser.findOne({ email });
      if (admin) {
        if (password === admin.password) {
          return {
            email,
            password,
          };
        }
      }
      return null;
    },
    cookieName: 'adminBro',
    cookiePassword: 'testTest',
  },
};
