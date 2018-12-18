import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from './decorators';
import {TYPES} from './constants';
import {Profile} from './profile.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(TYPES.VARCHAR)
  name: string;

  @Column(TYPES.INT)
  age: number;

  @OneToOne(() => Profile)
  profile: Profile;
}