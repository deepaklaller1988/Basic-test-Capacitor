import { Component } from '@angular/core';
import { BasicService } from '../basic.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public basicService: BasicService,
  ) {
    this.basicService.sendData('/token','').subscribe(res =>{
      localStorage.setItem('access_token',JSON.stringify(res));
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const option = {
        email: 'dinesh@yopmail.com',
        mobile: '+61410888666',
        firstName: 'Dinesh',
        lastName: 'Laller',
       };
      this.basicService.sendData('/users',option).subscribe(data =>{
        console.log(data);
      });
    });

  }

}
