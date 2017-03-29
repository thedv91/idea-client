import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination-control',
    templateUrl: './pagination-control.component.html',
    styleUrls: ['./pagination-control.component.css']
})
export class PaginationControlComponent implements OnInit {

    @Input() total: number;
    @Input() page?: number = 1;
    @Input() pages?: number;
    @Input() limit?: number = 20;
    @Input() limitChange = Function;
    @Input() pageChange = Function;

    pageList: any = [];

    constructor() {

    }

    ngOnInit() {
        for (let i = 1; i <= this.pages; i++) {
            this.pageList.push(i);
        }
    }

    onLimitChange(newValue) {

        this.limitChange(newValue);
    }

    goToPage(page: any) {
        this.pageChange(page);
    }


}
