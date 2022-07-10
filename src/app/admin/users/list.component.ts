import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

import { User } from '../../_models';
import { UserService } from '../../_services';

@Component({ templateUrl: 'list.component.html' })
export class UserListComponent {
    loading = false;
    users: User[] = [];
    totalElements: number = 0;

    constructor(private userService: UserService) { }

    private getUsers(request : any) {
        this.userService.getAll(request)
        .subscribe(data => {
            this.users = data['content'];
            this.totalElements = data['totalElements'];
        }
        , error => {
            console.log(error.error.message);
        }
        );
    }

    nextPage(event: PageEvent) {        
        this.getUsers({page:  event.pageIndex.toString(), size: event.pageSize.toString()});
    }

    ngOnInit() {
        this.loading = true;
        this.getUsers({ page: "0", size: "5" });
        this.loading = false;
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
    }
}