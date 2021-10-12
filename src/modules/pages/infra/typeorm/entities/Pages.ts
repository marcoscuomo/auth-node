import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("PAGE")
class Page {
  @PrimaryColumn({ name: "PAGE_ID" })
  id: string;

  @Column({ name: "PAGE_DESCRIPTION" })
  description: string;

  @Column({ name: "PAGE_ACTIVE" })
  active: boolean;

  @Column({ name: "PAGE_DELETED" })
  deleted: boolean;

  @Column({ name: "PAGE_CREATED_AT" })
  createdAt: Date;

  @Column({ name: "PAGE_UPDATED_AT" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Page };
