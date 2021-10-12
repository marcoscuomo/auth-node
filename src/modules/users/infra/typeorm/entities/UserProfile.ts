import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Profile } from "./Profile";
import { User } from "./User";

@Entity("USER_PROFILE")
class UserProfile {
  @PrimaryColumn({ name: "USPR_ID" })
  id: string;

  @Column({ name: "USPR_PROF_ID" })
  profileId: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'USPR_PROF_ID' })
  profile: Profile;

  @Column({ name: "USPR_USER_ID" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "USPR_USER_ID" })
  user: User;

  @Column({ name: "USPR_ACTIVE" })
  active: boolean;

  @Column({ name: "USPR_DELETED" })
  deleted: boolean;

  @Column({ name: "USPR_CREATED_AT" })
  createdAt: Date;

  @Column({ name: "USPR_UPDATED_AT" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { UserProfile };
