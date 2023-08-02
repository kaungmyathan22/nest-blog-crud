import { Exclude } from 'class-transformer';
import PostEntity from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  public address: Address;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  public posts: PostEntity[];
}

export default UserEntity;
