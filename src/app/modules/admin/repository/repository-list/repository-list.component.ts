import { Component, OnInit, Input } from '@angular/core';
import { ServerDataSource, LocalDataSource, ViewCell } from "ng2-smart-table";

import { RepositoryService } from "app/services/repository.service";

@Component({
    selector: 'app-admin-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {

    settings = {
        columns: {
            name: {
                title: 'Tên kho',
            },
            code: {
                title: 'Mã kho'
            },
            link: {
                title: '',
                type: 'custom',
                filter: false,
                editable: false,
                renderComponent: CustomRenderComponent,
            }
        },
        actions: {
            columnTitle: 'Hành động',
            position: 'right'
        },
        edit: {
            editButtonContent: 'Sửa',
            saveButtonContent: 'Lưu',
            cancelButtonContent: 'Hủy'
        },
        add: {
            confirmCreate: true,
            addButtonContent: 'Thêm mới',
            cancelButtonContent: 'Hủy',
            createButtonContent: 'Tạo'
        },
        delete: {
            deleteButtonContent: 'Xóa',
            confirmDelete: true,
        }
    };
    rows = [];

    source: LocalDataSource;

    constructor(private repositoryService: RepositoryService) { }

    ngOnInit() {
        this.source = new LocalDataSource();

        this.repositoryService.getList().subscribe((results) => {
            results.map((data, index) => {
                data.link = data.code;
                return data;
            });
            this.source.load(results);
        });
    }

    onOpcodesClick() {
        console.log(1);
    }

    onDeleteConfirm(event) {
        // if (window.confirm('Are you sure you want to delete?')) {
        this.repositoryService.remove(event.data).subscribe(res => {
            event.confirm.resolve();
        }, err => {
            event.confirm.reject();
        });

        // } else {
        //     event.confirm.reject();
        // }
    }

    onCreateConfirm(event) {
        this.repositoryService.create(event.newData).subscribe(res => {
            this.source.prepend(res);
            event.confirm.resolve();
        }, err => {
            event.confirm.reject();
        });
    }

    oneEditConfirm(event) {

    }

}

@Component({
    template: `
    <a [routerLink]="['/admin/repository', value]" >Thêm sản phẩm</a>
  `,
})

export class CustomRenderComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | any;

    constructor() { }

    ngOnInit() {

    }
}