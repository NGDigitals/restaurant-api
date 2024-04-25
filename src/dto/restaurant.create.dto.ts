import { 
    ApiProperty 
} from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber
} from 'class-validator';
import { Point } from 'geojson';

export class CreateRestaurantDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 9})
    latitude: number;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 9})
    longitude: number;

    location: Point;
}