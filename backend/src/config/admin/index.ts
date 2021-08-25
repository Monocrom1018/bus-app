import { UsersEntity } from '@users/users.entity';
import { AdminUsersEntity } from '@admin-users/admin-users.entity';
import { NoticesEntity } from '@notices/notices.entity';
import { FaqsEntity } from '@faqs/faqs.entity';
import { ReservationsEntity } from '@reservations/reservations.entity';
import { MonthsEntity } from '@months/months.entity';
import { ImagesEntity } from '@images/images.entity';

export const adminOptions = {
  adminBroOptions: {
    rootPath: '/admin',
    resources: [
      UsersEntity,
      AdminUsersEntity,
      NoticesEntity,
      FaqsEntity,
      ImagesEntity,
      ReservationsEntity,
      {
        resource: MonthsEntity,
        options: {
          listProperties: ['id', 'month', 'peak'],
          actions: {
            new: {
              isVisible: false,
            },
            delete: {
              isVisible: false,
            },
          },
        },
      },
    ],
    locale: {
      language: 'ko',
      translations: {
        labels: {
          Peaks: '성수기',
          Users: '유저',
          AdminUsers: '어드민',
          Notices: '공지사항',
          Faqs: '자주묻는질문',
          Reservations: '예약',
          Months: '시즌',
        },
        properties: {
          name: '이름',
          email: '이메일',
          createdAt: '생성일',
          updatedAt: '수정일',
          registration_confirmed: '가입승낙여부',
          profile: '프로필사진 URL',
          phone: '휴대폰번호',
          user_type: '유저타입',
          password: '비밀번호',
          title: '제목',
          body: '내용',
          question: '질문',
          answer: '답변',
          month: '월',
          peak: '성수기',
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
      const admin = await AdminUsersEntity.findOne({ email });
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
