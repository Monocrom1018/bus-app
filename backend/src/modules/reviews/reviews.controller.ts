import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewCreateDto } from './dto/create-review-dto';
import { ReviewUpdateDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: '리뷰 생성' })
  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'create Review success',
  })
  async create(@Body() reviewCreateDto: ReviewCreateDto) {
    return this.reviewsService.create(reviewCreateDto);
  }

  @ApiOperation({ summary: '특정 기사의 리뷰 모두 가져오기' })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'get all Reviews of driver success',
  })
  async getAllReviews(@Param('id') id: number) {
    return this.reviewsService.get(id);
  }

  @ApiOperation({ summary: '특정 예약의 단일 리뷰 가져오기' })
  @Get('/target/:id')
  @ApiResponse({
    status: 200,
    description: 'get Reviews of target reservation success',
  })
  async getTargetReviews(@Param('id') id: number) {
    return this.reviewsService.getTarget(id);
  }

  @ApiOperation({ summary: '리뷰 업데이트' })
  @Patch('/update')
  @ApiResponse({
    status: 200,
    description: 'get all Reviews of target driver success',
  })
  async updateReviews(@Body() reviewUpdateDto: ReviewUpdateDto) {
    return this.reviewsService.update(reviewUpdateDto);
  }

  @ApiOperation({ summary: '리뷰 제거' })
  @Delete()
  @ApiResponse({
    status: 200,
    description: 'destroy Review success',
  })
  async delete(@Param() reviewId: number) {
    return this.reviewsService.delete(reviewId);
  }
}
