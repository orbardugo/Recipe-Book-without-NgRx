import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/repository.service';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private repository: RepositoryService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  storeData() {
    this.repository.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        if (response.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * response.loaded / response.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (response instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      }
    );
    this.repository.storeShoppingList().subscribe(
      (response: HttpEvent<Object>) => console.log(response)
    );
  }

  getData() {
    this.repository.getRecipes();
    this.repository.getShoppingList();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
