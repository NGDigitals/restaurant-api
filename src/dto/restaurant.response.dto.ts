import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class RestaurantResponseDto {
    @Exclude()
    id: number;
    
    @ApiProperty({ required: true })
    name: string

    @ApiProperty({ required: true })
    address: string;

    @ApiProperty({ required: true })
    latitude: number;

    @ApiProperty({ required: true })
    longitude: number;

    @Exclude()
    location: any
}