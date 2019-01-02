import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css']
})
export class SliderHomeComponent implements OnInit {
  public imageUrlArray = [
    '../../../assets/images/slide-01.jpg',
    '../../../assets/images/slide-02.jpg',
    '../../../assets/images/slide-03.jpg',
  ];
  constructor() { }

  ngOnInit() {
  }

}
