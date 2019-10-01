import { Component, OnInit, Input, Output } from '@angular/core';
import { Profile } from 'src/app/state/profile.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProfileStateService } from 'src/app/state/profile.state.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() profile: Profile;
  @Output() result = new Subject<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private profileStateService: ProfileStateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: this.profile.id,
      name: [this.profile.name, [Validators.required, Validators.minLength(5)]]
    });
  }

  editProfile() {
    if ( this.form.invalid ) {
      return;
    }

    this.profileStateService.editProfile(this.form.value).subscribe(() => {
      alert(`Profile with ID: ${this.profile.id} has been successfully editted!`);
      this.result.next(true);
    });
  }

}
