import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';

@Controller('objects')
export class ObjectsController {
  // 의존성 주입 작업
  constructor(private readonly objectsService: ObjectsService) {}
  

  @Post()
  create(@Body() createObjectDto: CreateObjectDto) {
    // # todo user가 안필요 한 경우 ?
    // # 파라미터로 user~ hasmany 같이 보내줘야 하나 ,
    // # 어차피 user belongs to 걸려있고 파라미터에 따라서 current_api_user.items.create 이런식으로 ?
    // object = current_api_user.send(@objects_name).create(model_params)
    // render json: serialize(object)
    return this.objectsService.create(createObjectDto);
  }

  @Get()
  // @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() query, @Req() req) {
    // if params[:cursor] # Infinite Query
    //   cursor = params[:cursor].to_i
    //   objects = @object_class.ransack(index_params).result
    //   objects = objects.page(cursor)
    //   render json: {
    //     objects: each_serialize(objects, context: {current_api_user: current_api_user}),
    //     next_cursor: (params[:cursor] && cursor < objects.total_pages) ? cursor + 1 : false
    //   }
    // else # Query
    //   objects = @object_class.ransack(index_params).result
    //   render json: each_serialize(objects)
    // end
    console.log(query);
    return this.objectsService.getModel(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // object = @object_class.find(params[:id])
    // render json: serialize(object, context: {current_api_user: current_api_user})
    return this.objectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    // object = @object_class.find(params[:id])
    // object.update(model_params)
    // render json: serialize(object)
    return this.objectsService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // object = @object_class.find(params[:id])
    // object.destroy
    // render json: serialize(object)
    return this.objectsService.remove(+id);
  }
}
