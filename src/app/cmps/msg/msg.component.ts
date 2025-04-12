import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgService } from '../../../services/msg.service';
import { Msg } from '../../models/msg.model';


@Component({
    selector: 'msg',
    templateUrl: './msg.component.html',
    styleUrls: ['./msg.component.scss'],
    animations: [
        trigger('toggleMsg', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class MsgComponent {

    constructor(private msgService: MsgService) { }

    msg$!: Observable<Msg | null>;

    ngOnInit() {
        this.msg$ = this.msgService.msg$;
    }

    onCloseMsg() {
        this.msgService.closeMsg()
    }
}
