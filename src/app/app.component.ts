import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'project-cozastore';

    constructor(private _router: Router) { }

    ngOnInit() {
        // if (this._router.url === '/') {
        //     this._router.navigate(['/home']);
        // }
    }
}
