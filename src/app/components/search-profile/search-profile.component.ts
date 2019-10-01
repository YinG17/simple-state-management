import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/state/profile.model';
import { ProfileStateService } from 'src/app/state/profile.state.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit {


  form = this.fb.group({
    search: ['', []]
  });

  searchedProfile: Profile[];
  searchTerm = '';

  constructor(private fb: FormBuilder, public profileStateService: ProfileStateService) { }

  ngOnInit() {
  }

  search() {
    const search = this.form.get('search').value;
    this.profileStateService.searchProfile(search).subscribe();
  }

}
