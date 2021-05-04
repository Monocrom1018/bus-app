import React, { useState } from 'react';
import { Navbar, Page, PageContent, Link, Tabs, Tab, Toolbar, Button } from 'framework7-react';
import { getItem, getOptions } from '@api';
import { useQuery } from 'react-query';
import ImagesSlide from '@components/shared/ImagesSlide';
import ReactQueryState from '@components/shared/ReactQueryState';
import HeartContainer from '@components/shared/HeartContainer';
import DefaultInformation from '@components/items/DefaultInformation';
import OptionSelect from '@components/items/OptionSelect';
// import SimpleOptionSelect from '@components/items/SimpleOptionSelect';
import BuySheet from '@components/items/BuySheet';

const ItemShowPage = ({ f7route, f7router }) => {
  const { id } = f7route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState<number>(1);

  const ITEM_KEY = ['item', parseInt(id)];
  const { data: item, status, error } = useQuery(ITEM_KEY, getItem({ id }), {
    enabled: !!id,
  });

  const OPTIONS_KEY = ['options', parseInt(id, 10)];
  const { data: options } = useQuery(OPTIONS_KEY, getOptions(id), {
    enabled: !!id,
  });

  const firstOption = options && options.find((option) => option.stock !== 0);
  if (firstOption && !selectedOption) {
    setSelectedOption(() => firstOption);
  }

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink noShadow transparent sliding={false} className="bg-trans" />

      <Toolbar bottom className="item-toolbar">
        {item && (
          <>
            <HeartContainer
              targetType="Item"
              targetId={item.id}
              targetLikesCount={item.likes_count}
              className="block w-12 mx-3 text-center"
              heartClassName="text-red-500 text-2xl"
              countClassName="text-xs text-gray-600"
            />
            {options && options.find((option) => option.stock !== 0) ? (
              <Button sheetOpen=".buy-sheet" fill className="w-full h-11 text-base mr-3">
                구매하기
              </Button>
            ) : (
              <Button fill className="w-full h-11 text-base mr-3" disabled>
                품절되었습니다
              </Button>
            )}
          </>
        )}
      </Toolbar>

      {selectedOption && <BuySheet selectedOption={selectedOption} quantity={quantity} setQuantity={setQuantity} />}

      <PageContent className="pt-0">
        <ReactQueryState data={item} status={status} error={error} />

        <ImagesSlide imagable_type="Item" imagable_id={id} />
        {item && (
          <div>
            <div className="bg-white shadow overflow-hidden rounded-md">
              <ul className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                  <div className="text-sm font-semibold text-red-500 text-sm">{item.category.title}</div>
                  <div className="text-base">
                    {item.title}
                    <span className="float-right text-center">
                      <svg
                        className="text-gray-400 group-hover:text-gray-500 h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span className="text-xs font-light text-gray-500">100</span>
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <svg
                      className="w-4 h-4 fill-current text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-current text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-current text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-current text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-current text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-sm text-red-500 text-sm ml-2">100</span>
                  </div>

                  {item && <DefaultInformation target={selectedOption ? selectedOption : item} />}
                  {/* Advanced Version */}
                  {item && selectedOption && (
                    <OptionSelect
                      target={selectedOption ? selectedOption : item}
                      f7router={f7router}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      id={id}
                    />
                  )}
                  {/* Simple Version */}
                  {/* {options && selectedOption && (
                    <SimpleOptionSelect
                      options={options}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                    />
                  )} */}
                </li>
                <li className="px-6 py-4">
                  <div className="text-base font-medium">일반택배</div>
                  <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    무료배송
                  </span>
                </li>
              </ul>
            </div>
            <div className="border-b border-gray-200">
              <Toolbar tabbar className="-mb-px flex">
                <Link
                  tabLink="#desc"
                  tabLinkActive
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                >
                  설명
                </Link>
                <Link
                  tabLink="#info"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                >
                  정보
                </Link>
                <Link
                  tabLink="#reviews"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                >
                  리뷰
                </Link>
                <Link
                  tabLink="#comments"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                >
                  댓글
                </Link>
              </Toolbar>
            </div>

            <Tabs>
              <Tab id="desc" tabActive>
                <div className="mt-2 px-3 block text-base leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                  설명
                </div>
                <p className="mt-4 mb-8 px-3 text-md text-gray-500 leading-2">{item.description}</p>
              </Tab>
              <Tab id="info">
                <div className="mt-2 px-3 block text-base leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                  정보
                </div>
                <div className="flex flex-col mb-10 mt-4">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                옵션
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                사이즈
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                상세
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">L</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">상세</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">M</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">상세</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">상세</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 mb-8 px-3 text-md text-gray-500 leading-2">{item.description}</p>
              </Tab>
              <Tab id="reviews">
                <div className="mt-2 px-3 block text-base leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                  리뷰
                </div>
                <div className="mt-4 mb-8 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a href="#" className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">
                            How to use search engine optimization to drive sales
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro
                            quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore
                            temporibus quo laudantium.
                          </p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#">
                            <span className="sr-only">Brenna Goyette</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                              Brenna Goyette
                            </a>
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-10">Mar 10, 2020</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>4 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a href="#" className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">
                            How to use search engine optimization to drive sales
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro
                            quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore
                            temporibus quo laudantium.
                          </p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#">
                            <span className="sr-only">Brenna Goyette</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                              Brenna Goyette
                            </a>
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-10">Mar 10, 2020</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>4 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab id="comments">
                <div className="mt-2 px-3 block text-base leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                  댓글
                </div>
                <comments-list commentable_type="Item" commentable_id="${item.id}" />
                <div className="px-4 py-6 sm:px-6">
                  <ul className="space-y-8 mb-8">
                    <li>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">
                              Leslie Alexander
                            </a>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p>
                              Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores.
                              Similique voluptatibus tempore non ut.
                            </p>
                          </div>
                          <div className="mt-2 text-sm space-x-2">
                            <span className="text-gray-500 font-medium">4d ago</span>
                            <span className="text-gray-500 font-medium">&middot;</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">
                              Leslie Alexander
                            </a>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p>
                              Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores.
                              Similique voluptatibus tempore non ut.
                            </p>
                          </div>
                          <div className="mt-2 text-sm space-x-2">
                            <span className="text-gray-500 font-medium">4d ago</span>
                            <span className="text-gray-500 font-medium">&middot;</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </PageContent>
    </Page>
  );
};

export default ItemShowPage;
