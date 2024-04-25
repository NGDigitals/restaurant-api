import { Body, Controller, Delete, Get, HttpStatus, 
    Param, Post, Put, Query, Res, UsePipes, ValidationPipe 
} from '@nestjs/common';
import { MainService } from './main.service';
import { 
  ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, 
  ApiOkResponse, ApiTags 
} from '@nestjs/swagger';
import { UpdateRestaurantDto } from '../dto/restaurant.update.dto';
import { CreateRestaurantDto } from '../dto/restaurant.create.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { RestaurantResponseDto } from 'src/dto/restaurant.response.dto';

@SkipThrottle()
@Controller('/restaurants')
@ApiTags('restaurant-controller')
export class MainController {
  constructor(private readonly appService: MainService) {}

  @Get('?')
  @ApiOkResponse({
    description: 'Found',
    type: RestaurantResponseDto,
    isArray: false
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findRestaurant(@Query('id') id: number, @Res() res: any) {
    let restaurant = await this.appService.findRestaurant(id);
    return res.status(restaurant ? HttpStatus.OK : HttpStatus.NOT_FOUND)
          .json(restaurant);
  }

  @Put('?')
  @ApiOkResponse({
    description: 'Updated Succesfully',
    type: RestaurantResponseDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateRestaurant(@Query('id') id: number, @Body() data : UpdateRestaurantDto, @Res() res: any) {
    return res.status(HttpStatus.OK)
          .json(await this.appService.updateRestaurant(id, data));
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: RestaurantResponseDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createRestaurant(@Body() data : CreateRestaurantDto, @Res() res: any){
      return res.status(HttpStatus.CREATED)
        .json(await this.appService.createRestaurant(data));
  }

  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Get('search?')
  @ApiOkResponse({
    description: 'Found',
    type: RestaurantResponseDto,
    isArray: true
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findRestaurantsByLocation(@Query('city') city: string,
          @Query('latitude') latitude: number, 
          @Query('longitude') longitude: number,
          @Query('distance') distance: number,
          @Query('cuisine') cuisine: string,
          @Param('min_price') min_price: number,
          @Param('max_price') max_price: number,
          @Param('ratings') ratings: number,
          @Res() res: any){
            
            if(!city){
              return res.status(HttpStatus.NOT_FOUND)
                .json("Location Not Found");
            }else if(!distance || distance < 0){
              return res.status(HttpStatus.BAD_REQUEST)
                .json("Invalid distance");
            }else if(!latitude || !longitude || isNaN(latitude) || isNaN(longitude)){
              return res.status(HttpStatus.BAD_REQUEST)
                .json("Invalid location");
            }else{
              return res.status(HttpStatus.OK)
                .json(await this.appService.findRestaurantsByLocation(city, latitude, longitude, distance));
            }
  }

  @Delete('?')
  @ApiOkResponse({description: 'Deleted successfully'})
  @ApiNotFoundResponse({ description: 'Not Found' })
  async deleteRestaurant(@Query('id') id: number, @Res() res: any) {
    let deleted = await this.appService.deleteRestaurant(id);
    return res.status(deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND)
          .json(deleted ? 'Restaurant deleted' : 'Could not delete Restaurant details');
  }

}
