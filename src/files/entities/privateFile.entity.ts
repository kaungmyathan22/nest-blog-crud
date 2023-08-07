import UserEntity from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PrivateFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @ManyToOne(() => UserEntity, (owner: UserEntity) => owner.files)
  public owner: UserEntity;
}

export default PrivateFile;
