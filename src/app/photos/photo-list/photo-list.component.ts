import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'wp-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = [];
  filter: string = '';
  userName: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PhotoService) {}
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  load(){
    const observable = 
      this.service.listFromUserPaginated(this.userName, ++this.currentPage);
    observable.subscribe(newPhotos => {
      this.filter = '';
      this.photos = this.photos.concat(newPhotos);
      if(!newPhotos.length) this.hasMore = false;
    });  
  }
}
