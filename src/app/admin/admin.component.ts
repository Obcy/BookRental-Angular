﻿import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent {
    loading = false;
    users: User[] | undefined;

    constructor(private userService: UserService) { }

    // ngOnInit() {
    //     this.loading = true;
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         this.loading = false;
    //         this.users = users;
    //     });
    // }
}