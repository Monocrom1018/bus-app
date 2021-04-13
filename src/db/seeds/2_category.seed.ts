import { Factory, Seeder } from 'typeorm-seeding';
import { Categories as Category } from '../../categories/entities/category.entity';
import multer from 'multer';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // const upload = multer({ dest: 'public/uploads/' });
    const category_titles = [
      '패션',
      '뷰티',
      '유아동',
      '식품',
      '주방용품',
      '생활용품',
      '인테리어',
      '가전',
      '스포츠',
      '자동차',
      '여행',
      '도서',
      '완구',
      '문구',
      '반려동물',
      '건강식품',
    ];

    for (const title of category_titles) {
      const index = category_titles.indexOf(title);

      await factory(Category)()
        .map(async (category) => {
          category.title = title;
          category.position = index;
          category.image = `public/icons/icon${index}.png`;
          return category;
        })
        .create();
    }
  }
}
