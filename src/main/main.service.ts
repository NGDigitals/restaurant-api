import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../entity/restaurants.entity';
import { Repository } from 'typeorm';
import { Point } from 'geojson';
import { CreateRestaurantDto } from '../dto/restaurant.create.dto';
import { UpdateRestaurantDto } from '../dto/restaurant.update.dto';
import { plainToInstance } from 'class-transformer';
import { RestaurantResponseDto } from 'src/dto/restaurant.response.dto';

@Injectable()
export class MainService {

  constructor(
    @InjectRepository(Restaurant) 
    private readonly repository: Repository<Restaurant>
  ) {}

  public async createRestaurant(data: CreateRestaurantDto){
    const point: Point = {
        type: "Point",
        coordinates: [data.longitude, data.latitude]
    };
    data.location = point;
    let restaurant = await this.repository.save(data);
    return plainToInstance(RestaurantResponseDto, restaurant);
  }

  public async updateRestaurant(id: number, data: UpdateRestaurantDto){
    let restaurant = await this.repository.findOne({
      where: { id }
    });
    
    if(data.latitude && data.longitude){
      const location: Point = {
          type: "Point",
          coordinates: [data.longitude, data.latitude]
      };
      data.location = location;
    }else{
      delete data.latitude;
      delete data.longitude;
    }
    restaurant = await this.repository.save({
      ...restaurant,
      ...data
    });
    return plainToInstance(RestaurantResponseDto, restaurant)
  }

  public async findRestaurant(id: number){
    let restaurant = await this.repository.findOne({
      where: { id },
      select: {name: true, address: true, latitude: true, longitude: true}
    });
    return plainToInstance(RestaurantResponseDto, restaurant);
  }

  public async findRestaurantsByLocation(city: string, latitude: number, 
          longitude:number, distance:number = 10) {
    let location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };
    let restaurants = await this.repository
        .createQueryBuilder('restaurants')
        .select(['name, address, latitude, longitude','ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance' ])
        .where("ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)), :range)")
        .where("address like :city", { city:`%${city}%` })
        .orderBy("distance","ASC")
        .setParameters({
          origin: JSON.stringify(location),
          range: distance*1000 // Distance converted to KM
        }).getRawMany();
        
    return plainToInstance(RestaurantResponseDto, restaurants);
  }

  public async deleteRestaurant(id: number){
    const deleted = await this.repository.delete({id: id});
    return (deleted && deleted.affected == 1)
  }
}
