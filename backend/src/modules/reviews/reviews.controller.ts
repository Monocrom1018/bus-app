import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

  @ApiOperation({ summary: '리뷰 가져오기' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'get Reviews of target success',
  })
  async getReviews(
    @Query('driver') driverId?: number,
    @Query('reservation') reservationId?: number
  ) {
    return this.reviewsService.getReviews(driverId, reservationId)
  }

  @ApiOperation({ summary: '리뷰 업데이트' })
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'get all Reviews of target driver success',
  })
  async updateReviews(
    @Body() reviewUpdateDto: ReviewUpdateDto, 
    @Param('id') reservationId: number
  ) {
    return this.reviewsService.update(reviewUpdateDto, reservationId);
  }

  @ApiOperation({ summary: '리뷰 제거' })
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'destroy Review success',
  })
  async delete(@Param('id') reviewId: number) {
    return this.reviewsService.delete(reviewId);
  }
}
