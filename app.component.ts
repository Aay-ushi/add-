import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {
    Router,
    RouteConfigLoadStart,
    RouteConfigLoadEnd
} from '@angular/router';
import { PreloaderService } from './shared/preloader/preloader.service';
import { Constants } from 'src/app/app.config';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { Services } from "./services/server.service";
import { StartupService } from 'src/app/core/services/startup.service';

@Component({
    selector: 'crc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public data : any;

    constructor(
        private router: Router,
        private preloader: PreloaderService,
        private appConstants: Constants,
        public authService: AuthService,
        private startupService: StartupService,
        private services: Services
        ) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                this.preloader.start();
            } else if (event instanceof RouteConfigLoadEnd) {
                this.preloader.stop();
            }
        });
        this.startupService.setApplicationLanguage(
            this.appConstants.defaultLanguageId
        );
        this.startupService.applicationInitiated$.subscribe((userInfo: any) => {
            this.authService.loginCompleted = true;
            console.log('here');
            this.router.navigate(['/home']);
        });
        this.printFunction();
    }

    printFunction(){
        this.services.serverServices()
            .subscribe(
                (res:any)=>{
                    console.log("Service is working Well",res);
                    this.data = res.data;
                     
                    
                },
                (err:any)=>{
                    console.log("Some Error encountered");
                }
            )

    }
}
