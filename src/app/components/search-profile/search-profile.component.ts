import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProfileState, ProfileStateModel } from 'src/app/state/profile.state';
import { map } from 'rxjs/operators';
import { SearchProfile } from 'src/app/state/profile.actions';
import { Profile } from 'src/app/state/profile.model';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit {

  @Select(ProfileState.searchProfile)
  profiles: Observable<Profile[]>;

  form = this.fb.group({
    search: ['', []]
  });

  searchedProfile: Profile[];
  searchTerm = '';

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
  }

  searchProfile() {
    const search = this.form.get('search').value;
    this.searchTerm = search;
    this.store.dispatch(new SearchProfile(search)).subscribe();
  }

}
