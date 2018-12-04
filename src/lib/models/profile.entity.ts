import {Column, Entity, PrimaryGeneratedColumn} from './decorators';
import {TYPES} from './constants';

@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(TYPES.VARCHAR)
  description: string;
}