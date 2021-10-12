import { Page } from "@modules/pages/infra/typeorm/entities/Pages";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Profile } from "./Profile";
import { User } from "./User";

@Entity("PAGE_PROFILE")
class PageProfile {
  @PrimaryColumn({ name: "PAPR_ID" })
  id: string;

  @Column({ name: "PAPR_PROF_ID" })
  profileId: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'PAPR_PROF_ID' })
  profile: Profile;

  @Column({ name: "PAPR_PAGE_ID" })
  pageId: string;

  @ManyToMany(() => Page)
  @JoinColumn({ name: "PAPR_PAGE_ID" })
  page: Page;

  @Column({ name: "PAPR_ACTIVE" })
  active: boolean;

  @Column({ name: "PAPR_DELETED" })
  deleted: boolean;

  @Column({ name: "PAPR_CREATED_AT" })
  createdAt: Date;

  @Column({ name: "UPAPR_UPDATED_AT" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { PageProfile };
