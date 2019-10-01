import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select } from '@ngxs/store';
import { ProfileState } from 'src/app/state/profile.state';
import { Observable } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit {


  @Select(ProfileState.getProfileList)
  profileList: Observable<Profile[]>;

  form = this.fb.group({
    search: ['', []]
  });

  searchedProfile: Profile[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  searchProfile() {
    const search = this.form.get('search').value;
  }

}
