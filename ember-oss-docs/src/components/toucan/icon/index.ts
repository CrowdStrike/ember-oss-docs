// Until types for this are published, we can't safely guarantee it exists or is missing
import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { MAP } from './map';

export default class IconComponent extends Component<{
  Element: SVGElement;
  Args: {
    path: string;
  };
}> {
  get Icon() {
    let { path } = this.args;

    assert(`Icon, using @path="${path}", is not known.`, isValid(path));

    return MAP[path];
  }
}

function isValid(key: string): key is keyof typeof MAP {
  return key in MAP;
}
