import { Profile } from './profile.model';

/**
 * `Action without payload`
 *
 * - this action simply contain a type which will serve as an Identifier.
 */


/**
 * `GetProfileList`
 */
export class GetProfileList {
  static readonly type = '[Profile] List';
}


/**
 * `Actions with payload`
 *
 * - contains a type as the action's identifier
 * - this actions accepts argument with a certain type.
 */


/**
 * `AddProfile`
 */
export class AddProfile {
  static readonly type = '[Profile] Add';
  constructor(public profile: Profile) { }
}

/**
 * `EditProfile`
 */
export class SetProfileOnEdit {
  static readonly type = '[Profile] Edit';
  constructor(public id: number) { }
}

export class EditProfile {
  static readonly type = '[Profile] Edit';
  constructor(public profile: Profile) { }
}

/**
 * `SearchProfile`
 */
export class SearchProfile {
  static readonly type = '[Profile] Search';

  constructor(public search: string) {}
}

/**
 * `DeleteProfile`
 */
export class DeleteProfile {
  static readonly type = '[Profile] Delete';
  constructor(public id: number) { }
}



