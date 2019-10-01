import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileStateService } from './state/profile.state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  idOnEdit = 0;
  submit = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  });

  subs = new Subscription();

  constructor(private fb: FormBuilder, public profileStateService: ProfileStateService) {
  }

  addProfile() {
    this.submit = true;

    if (this.form.invalid) {
      alert('invalid name!');
      return;
    }
    this.profileStateService.addProfile(this.form.value).subscribe(
      ([profiles, latest]) => {
        // console.log('profiles', profiles);
        // console.log('latest', latest);
        alert('profile added!');
        this.form.patchValue({ name: '' });
        this.submit = false;
      }
    );
  }

  deleteProfile(id: number) {
    const conf = confirm('Delete this profile?');

    if (!conf) {
      return;
    }

    this.profileStateService.deleteProfile(id).subscribe(() => {
      /**
       * since the state handle the management of itself, we only need to wait for it's completion.
       */
      alert('profile deleted!');
    });
  }

  /**
   * non state things, ignore ....
   */
  get minErr() {
    return this.form.get('name').hasError('minlength');
  }

  get reqErr() {
    return this.form.get('name').hasError('required');
  }

  get touched() {
    return this.form.get('name').touched;
  }
}
