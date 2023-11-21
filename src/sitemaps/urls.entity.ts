import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Url {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public url: string;
}

export default Url;
