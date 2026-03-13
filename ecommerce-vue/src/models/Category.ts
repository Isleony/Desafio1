export interface CategoryProps {
  id: number;
  name: string;
}

export class Category implements CategoryProps {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
