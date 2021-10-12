import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("PROFILE")
class Profile {
  @PrimaryColumn({ name: "PROF_ID" })
  id: string;

  @Column({ name: "PROF_DESCRIPTION" })
  description: string;

  @Column({ name: "PROF_ACTIVE" })
  active: boolean;

  @Column({ name: "PROF_DELETED" })
  deleted: boolean;

  @Column({ name: "PROF_CREATED_AT" })
  createdAt: Date;

  @Column({ name: "PROF_UPDATED_AT" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Profile };
