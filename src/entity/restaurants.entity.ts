import { Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import { Point } from 'geojson';

@Entity('restaurants')
export class Restaurant {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    address: string;

    @Column({type: 'double precision', nullable: false})
    latitude: number;

    @Column({type: 'double precision', nullable: false})
    longitude: number;

    @Index({ spatial: true })
    @Column({
        type: 'geography', 
        srid: 4326,
        spatialFeatureType: 'Point',
        nullable: true,
    })
    location:Point
}