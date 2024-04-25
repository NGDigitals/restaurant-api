import { 
  ApiProperty 
} from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional
} from 'class-validator';
import { Point } from 'geojson';

export class UpdateRestaurantDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address: string;

    @ApiProperty({ required: true })
    @IsNumber({maxDecimalPlaces: 9})
    @IsNotEmpty()
    @IsOptional()
    latitude: number;
    
    @ApiProperty({ required: true })
    @IsNumber({maxDecimalPlaces: 9})
    @IsNotEmpty()
    @IsOptional()
    longitude: number;


    location: Point;
}