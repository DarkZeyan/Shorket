import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit{

  public category: string = '';
  public banner_img: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.category = params['name'];
        this.banner_img = `assets/cat-banners/${this.category}.png`;
      });
  }

}
