import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private contactService: ContactService){}

  ngOnInit() {
    
  }

}
