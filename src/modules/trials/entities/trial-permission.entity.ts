import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";
import { TrialPermissions } from "../interfaces/trials.interface";
import { Trial } from "./trial.entity";
import { User } from "../../users/entities/user.entity";

@Entity('trial_permissions')
export class TrialPermission extends AbstractEntity {
    @Column({ type: 'enum', enum: TrialPermissions })
    permission: TrialPermissions;

    @Column()
    trialId: string;

    @ManyToOne(() => Trial, { onDelete: 'CASCADE' })
    @JoinColumn()
    trial: Trial;

    @Column()
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}